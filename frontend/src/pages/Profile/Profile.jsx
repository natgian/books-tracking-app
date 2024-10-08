import { useContext } from "react";
import { PageTitle } from "../../components";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>Loading user data...</p>; // This will show while user is not available
  }

  return (
    <section className="section-container">
      <PageTitle text="Dein Profil" lineWidth="8rem" />
      <div>
        <p>Benutzername: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>
    </section>
  );
};
export default Profile;
