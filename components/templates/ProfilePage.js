import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import ProfileData from "../modules/ProfileData";
import ProfileForm from "../modules/ProfileForm";

function ProfilePage() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await fetch("/api/Userinfo");
    const data = await res.json();
    if (data.status === "success" && data.data.name && data.data.lastName) {
        setData(data);
    }
  };

  const submitHandler = async () => {
    const res = await fetch("/api/Userinfo", {
      method: "POST",
      body: JSON.stringify({ name, lastName, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
  };
  return (
    <div className="profile-form">
      <h2>
        <CgProfile />
        Profile
      </h2>
      {!data ? (
        <ProfileForm
          name={name}
          setName={setName}
          lastName={lastName}
          setLastName={setLastName}
          password={password}
          setPassword={setPassword}
          submitHandler={submitHandler}
        />
      ) : (
        <ProfileData data={data.data}/>
      )}
    </div>
  );
}

export default ProfilePage;
