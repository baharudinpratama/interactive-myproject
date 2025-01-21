"use client";

import MyButton from "@/app/components/button";
import { useWorkspaceContext, Workspace } from "@/app/contexts/workspace";
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
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
  Modal,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";

const DemoApp: React.FC = () => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const { workspaces, setWorkspaces } = useWorkspaceContext();
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newEventTitle, setNewEventTitle] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);

  useEffect(() => {
    const events: EventInput[] = [];

    workspaces.forEach((workspace) => {
      workspace.projects.forEach((project) => {
        project.tasks.forEach((task) => {
          events.push({
            id: task.id,
            title: task.name,
            start: task.start,
            end: task.end,
            allDay: true
          });
        });
      });
    });

    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.removeAllEvents();
      events.forEach(event => calendarApi.addEvent(event));
    }
  }, [workspaces]);

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
    }
  };

  const handleEvents = (events: EventApi[]) => {
    setCurrentEvents(events);
  }

  const handleEventChange = (e: EventChangeArg) => {
    const updatedWorkspaces = workspaces.map(workspace => ({
      ...workspace,
      projects: workspace.projects.map(project => ({
        ...project,
        tasks: project.tasks.map(task =>
          task.id === e.event.id
            ? { ...task, start: new Date(e.event.startStr), end: new Date(e.event.endStr) }
            : task
        )
      }))
    }));

    setWorkspaces(updatedWorkspaces);
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
        start: selectedDate.start,
        end: selectedDate.end,
        allDay: selectedDate.allDay,
      };

      calendarApi.addEvent(newEvent);
      handleCloseDialog();
    }
  };

  const handleUpdate = () => {

  };

  return (
    <div>
      <div className="flex w-full px-10 justify-start items-start gap-8">
        <div className="w-3/12">
          <div className="pt-10 text-2xl font-extrabold px-7">
            Calendar Events
          </div>
          <div className="flex py-4">
            <MyButton
              color="yellow"
              children="Refresh Events"
              onPress={handleUpdate}
              className="px-6"
            />
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
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
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

      <Modal isOpen={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <ModalContent>
          <ModalHeader>Add New Event Details</ModalHeader>
          <form className="space-x-5 mb-4" onSubmit={handleAddEvent}>
            <input
              type="text"
              placeholder="Event Title"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              required
              className="border border-gray-200 p-3 rounded-md text-lg"
            />
            <button
              className="bg-green-500 text-white p-3 mt-5 rounded-md"
              type="submit"
            >
              Add
            </button>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DemoApp;
