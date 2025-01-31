"use client";

import MyButton from "@/app/components/button";
import MyInput from "@/app/components/input";
import { useWorkspaceContext } from "@/app/contexts/workspace";
import {
  DateSelectArg,
  EventApi,
  EventChangeArg,
  EventClickArg,
  EventInput,
  formatDate,
} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";

const DemoApp: React.FC = () => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const { tasks, addTask, updateTask, deleteTask } = useWorkspaceContext();
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newEventTitle, setNewEventTitle] = useState<string>("");
  const [startDateInput, setStartDateInput] = useState<string>("");
  const [endDateInput, setEndDateInput] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);

  useEffect(() => {
    const events: EventInput[] = [];

    tasks.forEach((task) => {
      let allDay = false;
      if (
        task.start.toTimeString().startsWith("00:00:00") &&
        task.end.toTimeString().startsWith("00:00:00")
      ) {
        allDay = true;
      }
      events.push({
        id: task.id,
        title: task.name,
        start: task.start,
        end: task.end,
        allDay,
      });
    });

    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.removeAllEvents();
      events.forEach(event => calendarApi.addEvent(event));
    }
  }, [tasks]);

  const handleDateClick = (selected: DateSelectArg) => {
    setSelectedDate(selected);
    setIsDialogOpen(true);
  };

  const handleEventClick = (selected: EventClickArg) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event "${selected.event.title}"?`
      )
    ) {
      selected.event.remove();
      const updatedEvents = currentEvents.filter(
        (event) => event.id !== selected.event.id
      );
      setCurrentEvents(updatedEvents);
      deleteTask(selected.event.id);
    }
  };

  const handleEvents = (events: EventApi[]) => {
    setCurrentEvents(events);
  }

  const handleEventChange = (e: EventChangeArg) => {
    const updatedEvents = currentEvents.map(
      (event) => event.id === e.event.id
        ? e.event
        : event
    );
    setCurrentEvents(updatedEvents);
    updateTask(e.event.id, {
      start: new Date(e.event.startStr),
      end: new Date(e.event.endStr),
    });
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewEventTitle("");
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEventTitle && selectedDate) {
      const calendarApi = selectedDate.view.calendar;
      calendarApi.unselect();

      const newEvent = {
        id: `${Date.now()}-${newEventTitle}`,
        title: newEventTitle,
        start: startDateInput,
        end: endDateInput,
        allDay: false,
      };

      addTask({
        start: new Date(startDateInput),
        end: new Date(endDateInput),
        name: newEventTitle,
        // id: 
        // progress: 0,
        type: "task",
        // dependencies?: string[];
        // project?: string;
        // displayOrder?: number;
      });

      calendarApi.addEvent(newEvent);
      handleCloseDialog();
    }
  };

  return (
    <div>
      <div className="flex w-full px-10 justify-start items-start gap-8">
        <div className="w-3/12">
          <div className="pt-10 pb-4 text-2xl font-extrabold px-7">
            Calendar Events
          </div>
          <ul className="space-y-4">
            {currentEvents.length <= 0 && (
              <div className="italic text-center text-gray-400">
                No Events Present
              </div>
            )}

            {currentEvents.length > 0 &&
              currentEvents.map((event: EventApi) => (
                <li
                  key={event.id}
                  className="flex flex-col border border-gray-200 shadow px-4 py-2 rounded-md text-blue-800"
                >
                  {event.title}
                  <div className="flex justify-between">
                    <label className="text-slate-950">
                      {formatDate(event.start!, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </label>
                    <label className="text-slate-950">
                      {formatDate(event.end!, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </label>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        <div className="w-9/12 mt-8">
          <FullCalendar
            ref={calendarRef}
            height={"85vh"}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={handleEvents}
            eventChange={handleEventChange}
          />
        </div>
      </div>

      <Modal isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} size="sm">
        <ModalContent>
          <ModalHeader>Add New Event Details</ModalHeader>
          <ModalBody className="p-[25px] pt-0">
            <form className="flex flex-col items-center gap-[12px]" onSubmit={handleAddEvent}>
              <MyInput
                type="text"
                label="Title"
                placeholder="Event Title"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                required
              />
              <MyInput
                type="datetime-local"
                label="Date Start"
                placeholder="Date start"
                value={startDateInput}
                onChange={(e) => setStartDateInput(e.target.value)}
                required
              />
              <MyInput
                type="datetime-local"
                label="Date End"
                placeholder="Date end"
                value={endDateInput}
                onChange={(e) => setEndDateInput(e.target.value)}
                required
              />
              <div className="flex justify-end items-center self-stretch">
                <MyButton
                  color="yellow"
                  type="submit"
                >
                  Add
                </MyButton>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DemoApp;
