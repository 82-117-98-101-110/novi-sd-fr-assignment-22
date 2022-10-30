import DefaultPageLayoutClosed from "../../components/DefaultPageLayoutClosed";
import ContactsSection from "../../feature/contacts/ContactsSection";

function ContactsOverview() {
  return (
    <>
      <DefaultPageLayoutClosed>
        <ContactsSection />
      </DefaultPageLayoutClosed>
    </>
  );
}

export default ContactsOverview;
