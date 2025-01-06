"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

type ReadingEntry = {
  id: string;
  title: string;
  author: string;
  type: "Book" | "Article" | "Essay";
  status: "Reading" | "Completed";
  start_date: string;
  completion_date?: string;
  notes?: string;
};

const COLUMN_WIDTHS = {
  TITLE: "w-[250px]",
  AUTHOR: "w-[200px]",
  TYPE: "w-[180px]",
  STATUS: "w-[180px]",
  START_DATE: "w-[200px]",
  COMPLETION_DATE: "w-[200px]",
  NOTES: "w-[250px]",
  ACTIONS: "w-[70px]"
} as const;

export function ReadingEntriesList() {
  const [entries, setEntries] = useState<ReadingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [editingCell, setEditingCell] = useState<{
    id: string;
    field: keyof ReadingEntry;
  } | null>(null);

  const supabase = createClient();

  useEffect(() => {
    fetchEntries();
  }, []);

  async function fetchEntries() {
    const { data, error } = await supabase
      .from("reading_entries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching entries:", error);
    } else {
      setEntries(data || []);
    }
    setLoading(false);
  }

  async function deleteEntry(id: string) {
    const { error } = await supabase
      .from("reading_entries")
      .delete()
      .match({ id });

    if (error) {
      console.error("Error deleting entry:", error);
    } else {
      fetchEntries();
    }
  }

  async function addNewEntry() {
    const { data: { user } } = await supabase.auth.getUser();
    const newEntry = {
      id: crypto.randomUUID(),
      title: "",
      author: "",
      type: "Book" as const,
      status: "Reading" as const,
      start_date: new Date().toISOString(),
      notes: "",
      user_id: user?.id
    };

    const { error } = await supabase
      .from("reading_entries")
      .insert(newEntry);

    if (error) {
      console.error("Error adding new entry:", error);
      return;
    }

    await fetchEntries();
    setEditingCell({ id: newEntry.id, field: 'title' });
  }

  async function updateCell(id: string, field: keyof ReadingEntry, value: string) {
    const { error } = await supabase
      .from("reading_entries")
      .update({ [field]: value })
      .match({ id });

    if (error) {
      console.error("Error updating cell:", error);
      return;
    }

    setEditingCell(null);
    await fetchEntries();
  }

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.notes?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === "all" || entry.type === typeFilter;
    const matchesStatus = statusFilter === "all" || entry.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  function EditableCell({ 
    entry, 
    field, 
    value 
  }: { 
    entry: ReadingEntry; 
    field: keyof ReadingEntry; 
    value: string 
  }) {
    const isEditing = editingCell?.id === entry.id && editingCell.field === field;
    const [editValue, setEditValue] = useState(value);

    const getColumnWidth = (field: keyof ReadingEntry) => {
      switch (field) {
        case "title": return COLUMN_WIDTHS.TITLE;
        case "author": return COLUMN_WIDTHS.AUTHOR;
        case "type": return COLUMN_WIDTHS.TYPE;
        case "status": return COLUMN_WIDTHS.STATUS;
        case "start_date": return COLUMN_WIDTHS.START_DATE;
        case "completion_date": return COLUMN_WIDTHS.COMPLETION_DATE;
        case "notes": return COLUMN_WIDTHS.NOTES;
        default: return COLUMN_WIDTHS.TYPE;
      }
    };

    if (isEditing && (field === "start_date" || field === "completion_date")) {
      return (
        <TableCell className={`p-0 ${getColumnWidth(field)}`}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="w-full h-full justify-start font-normal truncate"
              >
                {editValue || <span>Pick a date</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50 flex-shrink-0" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={new Date(editValue)}
                onSelect={(date) => {
                  if (date) {
                    const formattedDate = format(date, "MMM d, yyyy");
                    setEditValue(formattedDate);
                    updateCell(entry.id, field, date.toISOString());
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </TableCell>
      );
    }

    if (isEditing && (field === "status" || field === "type")) {
      return (
        <TableCell className={`p-0 ${getColumnWidth(field)}`}>
          <Select
            value={editValue}
            onValueChange={(value) => {
              updateCell(entry.id, field, value);
            }}
          >
            <SelectTrigger className="w-full h-full border-0 focus:ring-0">
              <SelectValue className="truncate">{editValue}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {field === "status" ? (
                <>
                  <SelectItem value="Reading">Reading</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="Book">Book</SelectItem>
                  <SelectItem value="Article">Article</SelectItem>
                  <SelectItem value="Essay">Essay</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </TableCell>
      );
    }

    if (isEditing) {
      return (
        <TableCell className={`p-0 ${getColumnWidth(field)}`}>
          <Input
            autoFocus
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={() => updateCell(entry.id, field, editValue)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                updateCell(entry.id, field, editValue);
              }
            }}
            className="h-full w-full border-0 focus-visible:ring-0 rounded-none"
          />
        </TableCell>
      );
    }

    return (
      <TableCell 
        onClick={() => setEditingCell({ id: entry.id, field })}
        className={`cursor-pointer truncate ${getColumnWidth(field)}`}
      >
        {value}
      </TableCell>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search entries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="sm:max-w-[300px]"
        />
        <div className="flex gap-2">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Book">Book</SelectItem>
              <SelectItem value="Article">Article</SelectItem>
              <SelectItem value="Essay">Essay</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Reading">Reading</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className={COLUMN_WIDTHS.TITLE}>Title</TableHead>
              <TableHead className={COLUMN_WIDTHS.AUTHOR}>Author</TableHead>
              <TableHead className={COLUMN_WIDTHS.TYPE}>Type</TableHead>
              <TableHead className={COLUMN_WIDTHS.STATUS}>Status</TableHead>
              <TableHead className={COLUMN_WIDTHS.START_DATE}>Start Date</TableHead>
              <TableHead className={COLUMN_WIDTHS.COMPLETION_DATE}>Completion Date</TableHead>
              <TableHead className={COLUMN_WIDTHS.NOTES}>Notes</TableHead>
              <TableHead className={COLUMN_WIDTHS.ACTIONS}></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Loading entries...
                </TableCell>
              </TableRow>
            ) : filteredEntries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No entries found.
                </TableCell>
              </TableRow>
            ) : (
              filteredEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <EditableCell entry={entry} field="title" value={entry.title} />
                  <EditableCell entry={entry} field="author" value={entry.author} />
                  <EditableCell entry={entry} field="type" value={entry.type} />
                  <EditableCell entry={entry} field="status" value={entry.status} />
                  <EditableCell 
                    entry={entry} 
                    field="start_date" 
                    value={format(new Date(entry.start_date), "MMM d, yyyy")} 
                  />
                  <EditableCell 
                    entry={entry} 
                    field="completion_date" 
                    value={entry.completion_date 
                      ? format(new Date(entry.completion_date), "MMM d, yyyy")
                      : "-"
                    } 
                  />
                  <EditableCell 
                    entry={entry} 
                    field="notes" 
                    value={entry.notes || "-"} 
                  />
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => deleteEntry(entry.id)}
                          className="text-red-600"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
            <TableRow>
              <TableCell colSpan={8}>
                <Button
                  onClick={addNewEntry}
                  variant="ghost"
                  className="w-full h-8 hover:bg-muted/50"
                >
                  + Add new entry
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 