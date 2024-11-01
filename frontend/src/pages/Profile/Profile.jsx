import "./Profile.css";
import { useContext } from "react";
import { PageTitle, UpdateBtn } from "../../components";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return <p>Loading user data...</p>; // This will show while user is not available
  }

  const handlePasswordChange = () => {
    navigate("/passwort-aktualisieren");
  };

  return (
    <section className="section-container">
      <PageTitle text="Dein Profil" lineWidth="8rem" />
      <div className="border-container">
        <dl className="profile-details">
          <h2>Kontodaten</h2>
          <div className="profile-item">
            <dt>Benutzername:</dt>
            <dd>{user.username}</dd>
          </div>
          <div className="profile-item">
            <dt>E-Mail:</dt>
            <dd>{user.email}</dd>
          </div>
          <div className="profile-item">
            <dt>Passwort:</dt>
            <dd>
              <UpdateBtn
                text="Passwort ändern"
                onClick={handlePasswordChange}
              />
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
};
export default Profile;
