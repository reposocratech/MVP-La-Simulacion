import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export const getMiniCardsData = () => [
  {
    id: 1,
    icon: <FaEnvelope color="var(--color-primary-baby-pink)" size={34} title="Email" />,
    title: "E-Mail",
    subtitle: "info.lasimulacion@gmail.com",
    href: "mailto:info.lasimulacion@gmail.com",
    bgColor: "var(--color-primary-electric-blue)"
  },
  {
    id: 2,
    icon: <FaPhone color="var(--color-primary-electric-blue)" size={34} title="Teléfono" />,
    title: "Teléfono",
    subtitle: "624 098 578",
    href: "tel:624098578",
    bgColor: "var(--color-primary-orange)"
  },
  {
    id: 3,
    icon: <FaMapMarkerAlt color="var(--color-primary-green)" size={34} title="Teléfono" />,
    title: "Ubicación",
    subtitle: "Carrer de Cabanes, 12006, Castelló de la Plana",
    href: "https://www.google.com/maps/search/?api=1&query=Carrer+de+Cabanes,+12006,+Castelló+de+la+Plana",
    bgColor: "var(--color-secondary-medium-lavender)"
  }
];