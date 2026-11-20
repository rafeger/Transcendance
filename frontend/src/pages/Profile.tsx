import React, { useState } from 'react';

type Profile = {
  firstName: string;
  lastName: string;
  username: string;
  dateBirth: string;
  country: string;
  city: string;
  bio: string;
};

function Profile() {
  const [profile, setProfile] = useState<Profile>({
    firstName: '',
    lastName: '',
    username: '',
    dateBirth: '',
    country: '',
    city: '',
    bio: '',
  });

  const [tempProfile, setTempProfile] = useState(profile);
  const [isEdit, setEdit] = useState(false);
  const [addFriend, setAddFriend] = useState(false);
  const [friendUsername, setFriendUsername] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setTempProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setProfile(tempProfile);
    setEdit(false);
  }

  function handleEdit() {
    setTempProfile({ ...profile });
    setEdit(true);
  }

  function handleCancel() {
    setTempProfile({ ...profile });
    setEdit(false);
  }

  function handleFriend(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!friendUsername.trim()) return;
    console.log('You send a friend request to: ', friendUsername);
    setFriendUsername('');
    setAddFriend(false);
  }

  function handleAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select an image.');
      return;
    }
    const imageUrl = URL.createObjectURL(file);
    setAvatar(imageUrl);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-white">
      <div className="mb-8 flex items-center gap-4">
        <div
          className="flex h-24 w-24 items-center justify-center
                overflow-hidden rounded-full bg-blue-600 text-3xl font-bold"
        >
          {avatar ? (
            <img
              src={avatar}
              alt="Profile avatar"
              className="h-full w-full object-cover"
            />
          ) : (
            profile.username.charAt(0).toUpperCase()
          )}
        </div>

        <div>
          <h2 className="text-xl font-bold">{profile.username}</h2>
          <label
            htmlFor="avatar"
            className="mt-2 inline-block cursor-pointer
                    rounded-lg bg-blue-600 px-3 py-2 hover:bg-blue-700"
          >
            Change avatar
          </label>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={handleAvatar}
            className="hidden"
          />
        </div>
      </div>

      <div className="mt-4">
        <button
          type="button"
          onClick={() => setAddFriend(!addFriend)}
          className="rounded-lg bg-blue-600 px-3 py-2 font-semibold
                hover:bg-blue-700"
        >
          Add a friend
        </button>

        {addFriend && (
          <form onSubmit={handleFriend} className="mt-4 flex gap-2">
            <input
              type="text"
              value={friendUsername}
              onChange={(e) => setFriendUsername(e.target.value)}
              placeholder="Enter an username..."
              className="min-w-0 rounded-lg border border-white/20
                        bg-slate-800 p-2"
            />

            <button
              type="submit"
              className="rounded-lg bg-green-600
                        px-3 py-2 hover:bg-green-700"
            >
              Send
            </button>
          </form>
        )}
      </div>

      <section className="mt-8">
        <div className="flex items-center justify-between border-b border-white/20 pb-2">
          <h2 className="text-2xl font-bold">Informations</h2>
          {!isEdit && (
            <button
              type="button"
              onClick={handleEdit}
              className="rounded-lg bg-blue-600 px-3 py-2 hover:bg-blue-700"
            >
              Modify
            </button>
          )}
        </div>

        {isEdit ? (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block mb-2">First Name</label>
              <input
                name="firstName"
                value={tempProfile.firstName}
                onChange={handleChange}
                placeholder="Your first name"
                className="rounded-lg border border-white/20 bg-slate-800 p-1"
              />
            </div>

            <div>
              <label className="block mb-2">Last Name</label>
              <input
                name="lastName"
                value={tempProfile.lastName}
                onChange={handleChange}
                placeholder="Your last name"
                className="rounded-lg border border-white/20 bg-slate-800 p-1"
              />
            </div>

            <div>
              <label className="block mb-2">Username</label>
              <input
                name="username"
                value={tempProfile.username}
                onChange={handleChange}
                placeholder="Your username"
                className="rounded-lg border border-white/20 bg-slate-800 p-1"
              />
            </div>

            <div>
              <label className="block mb-2">Date of Birth</label>
              <input
                type="date"
                name="dateBirth"
                value={tempProfile.dateBirth}
                onChange={handleChange}
                placeholder="Your date of birth"
                max={new Date().toISOString().split('T')[0]}
                className="rounded-lg border border-white/20 bg-slate-800 p-1"
              />
            </div>

            <div>
              <label className="block mb-2">Country</label>
              <input
                name="country"
                value={tempProfile.country}
                onChange={handleChange}
                placeholder="Your country"
                className="rounded-lg border border-white/20 bg-slate-800 p-1"
              />
            </div>

            <div>
              <label className="block mb-2">City</label>
              <input
                name="city"
                value={tempProfile.city}
                onChange={handleChange}
                placeholder="Your city"
                className="rounded-lg border border-white/20 bg-slate-800 p-1"
              />
            </div>

            <div>
              <label className="block mb-2">Biography</label>
              <input
                name="bio"
                value={tempProfile.bio}
                onChange={handleChange}
                className="size-32 w-full rounded-lg border border-white/20 bg-slate-800 p-1"
              />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 
                        px-3 py-2 font-semibold hover: bg-blue-700"
            >
              Submit
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="ml-2 rounded-lg bg-slate-700 px-3 py-2 hover:bg-slate-600"
            >
              Cancel
            </button>
          </form>
        ) : (
          <div className="mt-6 space-y-4 rounded-lg border p-2">
            <p>First Name: {profile.firstName || 'No information'}</p>
            <p>Last Name: {profile.lastName || 'No information'}</p>
            <p>Username: {profile.username || 'No information'}</p>
            <p>Date of birth: {profile.dateBirth || 'No information'}</p>
            <p>Country: {profile.country || 'No information'}</p>
            <p>City: {profile.city || 'No information'}</p>
            <p>Biography: {profile.bio || 'No information'}</p>
          </div>
        )}
      </section>

      <section className="mt-10">
        <div className="flex items-center justify-between border-b border-white/20 pb-2">
          <h2 className="text-2xl font-bold">Stats</h2>
        </div>
      </section>
    </main>
  );
}

export default Profile;
