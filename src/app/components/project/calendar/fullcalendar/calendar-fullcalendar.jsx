import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";

export default function Calendar() {
  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      expandRows={true}
      height={"100%"}
      dateClick={handleDateClick}
      eventClick={(e) => console.log(e)}
      eventContent={renderEventContent}
      editable={true}
      events={[
        { title: "event 1", date: "2024-12-09" },
        { title: "event 2", date: "2024-12-10" },
      ]}
    />
  )
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}
