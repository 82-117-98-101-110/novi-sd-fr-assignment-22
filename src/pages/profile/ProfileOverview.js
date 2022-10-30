import DefaultPageLayoutClosed from "../../components/DefaultPageLayoutClosed";
import ProfileSection from "../../feature/account/ProfileSection";

function ProfileOverview() {
  return (
    <>
      <DefaultPageLayoutClosed>
        <ProfileSection />
      </DefaultPageLayoutClosed>
    </>
  );
}

export default ProfileOverview;
