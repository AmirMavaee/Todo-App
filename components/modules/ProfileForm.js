function ProfileForm({
  name,
  setName,
  lastName,
  setLastName,
  password,
  setPassword,
  submitHandler,
}) {
  return(
    <>
        <div className="profile-form__input">
            <div>
                <lable htmlFor="name">Name : </lable>
                <input id="name" type="text" value={name} onChange={e=>setName(e.target.value)}/>
            </div>
            <div>
                <lable htmlFor="last-name">Last Name : </lable>
                <input id="last-name" type="text" value={lastName} onChange={e=>setLastName(e.target.value)}/>
            </div>
            <div>
                <lable htmlFor="password">Password : </lable>
                <input id="password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
            </div>
        </div>
        <button onClick={submitHandler}>Submit</button>
    </>
  );
}

export default ProfileForm;
