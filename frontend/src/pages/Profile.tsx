import React, { useState } from "react";
import { useTheme } from '../contexts/ThemeContext';
import { Button } from '../components/ui/Button';
import { Input } from "../components/ui";
import { useToast } from "../components/ui";

type Profile = { firstName: string; lastName: string; username: string; bio: string;
 }

function Profile() {
    const { showToast } = useToast();
    const { isDark } = useTheme();
    const [profile, setProfile] = useState<Profile>({
        firstName: "",
        lastName: "",
        username: "",
        bio: "",
    });

    const [tempProfile, setTempProfile] = useState(profile);
    const [loading, setLoading] = useState(false);
    const [isEdit, setEdit] = useState(false);
    const [addFriend, setAddFriend] = useState(false);
    const [friendUsername, setFriendUsername] = useState("");
    const [avatar, setAvatar] = useState<string | null>(null);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const {name, value} = e.target;
        setTempProfile((previous) => ({
            ...previous, [name]: value,
        }));
    }

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        try {
            setProfile(tempProfile);
            setEdit(false);
        } catch (error) {
            console.error("Impossible to modify profile", error);
        } finally {
            setLoading(false);
        }
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

        if (!friendUsername.trim()) return ;
        console.log("You send a friend request to: ", friendUsername);
        setFriendUsername("");
        setAddFriend(false);
    }

    function handleAvatar(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            alert("Please select an image.");
            return ;
        }
        const imageUrl = URL.createObjectURL(file);
        setAvatar(imageUrl);
    }

    function handleUpdateProfile() {
        showToast({
            title: "Success",
            message: "Your profile has been updated!",
            variant: "success",
        });
    }

    return (
        <main className={`min-h-screen px-4 py-16 ${isDark ? "bg-slate-800" : "bg-slate-50"}`}>
            <div className="mb-8 flex items-center gap-4">
                <div className="flex h-24 w-24 items-center justify-center
                overflow-hidden rounded-full bg-blue-600 text-3xl font-bold">
                    {avatar ? (
                        <img src={avatar} alt="Profile avatar"
                        className="h-full w-full object-cover" />
                    ) : (
                        profile.username.charAt(0).toUpperCase()
                    )}
                </div>

                <div>
                    <h2 className="text-xl font-bold">{profile.username}</h2>
                    <label htmlFor="avatar" className="mt-2 inline-block cursor-pointer
                    rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700">
                        Change Avatar
                    </label>
                    <input id="avatar" type="file" accept="image/*"
                    onChange={handleAvatar} className="hidden"/>
                </div>
            </div>

            <div className="mt-4">
                <Button type="button" variant="primary" size="md" 
                onClick={() => setAddFriend(!addFriend)}>Add a friend</Button>

                {addFriend && (
                    <form onSubmit={handleFriend} 
                    className="mt-4 flex gap-2">
                        <input type="text" value={friendUsername}
                        onChange={(e) => setFriendUsername(e.target.value)}
                        placeholder="Enter an username..."
                        className="min-w-0 rounded-lg border border-white/20
                        bg-slate-800 p-2" />

                        <Button type="submit" variant="primary" size="md">Send</Button>
                    </form>
                )}
            </div>

            <section className="mt-8">
                <div className="flex items-center justify-between border-b border-white/20 pb-2">
                    <h2 className="text-2xl font-bold">Informations</h2>
                    {!isEdit && (
                        <Button type="button" onClick={handleEdit}
                        variant="primary" size="md">Modify Profile</Button>
                    )}
                </div>

                {isEdit ? (
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <Input label="First Name" name="firstName"
                        value={tempProfile.firstName} onChange={handleChange}
                        placeholder="Your first name" />

                        <Input label="Last Name" name="lastName"
                        value={tempProfile.lastName} onChange={handleChange}
                        placeholder="Your last name" />

                        <Input label="Username" name="username"
                        value={tempProfile.username} onChange={handleChange}
                        placeholder="Your username" />

                        <Input label="Biography (optional)" name="bio"
                        value={tempProfile.bio} onChange={handleChange}
                        placeholder="Your biography" />

                        <Button type="submit" loading={loading} onClick={handleUpdateProfile}
                        variant="secondary" size="md" className="mr-2">Submit</Button>

                        <Button type="button" onClick={handleCancel}
                        variant="danger" size="md">Cancel</Button>
                    </form>
                ) : (
                    <div className="mt-6 space-y-4 p-2">
                        <p>First Name: {profile.firstName || "No information"}</p>
                        <p>Last Name: {profile.lastName || "No information"}</p>
                        <p>Username: {profile.username || "No information"}</p>
                        <p>Biography: {profile.bio || "No information"}</p>
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
