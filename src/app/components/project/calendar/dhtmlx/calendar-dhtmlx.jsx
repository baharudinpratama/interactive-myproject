import { useEffect, useRef } from "react";
import { EventCalendar } from "@dhx/trial-eventcalendar";
import "@dhx/trial-eventcalendar/dist/event-calendar.css"; // include Event Calendar styles

export function getData() {
  return [
    {
      id: '27',
      type: 'work',
      start_date: new Date('2024-12-29T14:00:00'),
      end_date: new Date('2024-12-29T18:30:00'),
      text: ' Olympiastadion - Berlin ',
      details: ' Berlin, GER '
    },
    {
      id: '28',
      type: 'rest',
      start_date: new Date('2024-12-30T14:00:00'),
      end_date: new Date('2024-12-30T16:00:00'),
      text: ' Commerz Bank Arena ',
      details: ' Frankfurt, GER '
    },
    {
      id: '29',
      type: 'meeting',
      start_date: new Date('2024-12-31T11:00:00'),
      end_date: new Date('2024-12-31T16:00:00'),
      text: ' Olympic Stadium - Munich ',
      details: ' Munich, GER '
    }
  ]
}

export default function Calendar(props) {
  let container = useRef();

  useEffect(() => {
    const calendar = new EventCalendar(container.current, {
      events: props.events,
      date: props.date,
    });

    return () => {
      calendar.destructor();
    };
  }, []);

  return <div ref={container} className="w-full"></div>;
}
