import React, { useState, useEffect } from "react";
import { useTheme } from '../contexts/ThemeContext';
import { Input, Button, useToast, Card } from "../components/ui";
import { profileSchema, type ProfileFormData } from "../schemas/profile";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { socket } from '../lib/socket';


type Profile = { username: string; bio: string;
 }

function Profile() {
    const [profile, setProfile] = useState<Profile>({
        //firstName: "",
        //lastName: "",
        username: "",
        bio: "",
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: profile,
    });

    const { showToast } = useToast();
    const { isDark } = useTheme();

    useEffect(()) => {
        
    }

    const [isEdit, setEdit] = useState(false);
    const [addFriend, setAddFriend] = useState(false);
    const [friendUsername, setFriendUsername] = useState("");
    const [avatar, setAvatar] = useState<string | null>(null);

      const onSubmit = async (data: ProfileFormData) => {
        setProfile(data);
        setEdit(false);

        const response = await fetch('/api/users/me', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include', //to save jwt in the front 
        body: JSON.stringify(data),
        });

        showToast({
            title: "Success",
            message: "Your profile has been updated!",
            variant: "success",
        });
    };

    function handleEdit() {
        reset(profile);
        setEdit(true);
    }

    function handleCancel() {
        reset(profile);
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
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                        {//<Input label="First Name" {... register('firstName')}
                        //error={errors.firstName?.message} />

                        //<Input label="Last Name" {... register('lastName')}
                        //error={errors.lastName?.message} />
                        }

                        <Input label="Username" {... register('username')}
                        error={errors.username?.message} />

                        <Input label="Biography (optional)" {... register('bio')}
                        error={errors.bio?.message} />

                        <Button type="submit" variant="secondary"
                        size="md" className="mr-2">Submit</Button>

                        <Button type="button" onClick={handleCancel}
                        variant="danger" size="md">Cancel</Button>
                    </form>
                ) : (
                    <div className="mt-6 space-y-4 p-2">
                        {//<p>First Name: {profile.firstName || "No information"}</p>
                        //<p>Last Name: {profile.lastName || "No information"}</p>
                }
                        <p>Username: {profile.username || "No information"}</p>
                        <p>Biography: {profile.bio || "No information"}</p>
                    </div>
                )}
            </section>

            <section className="mt-10">
                <div className="flex items-center justify-between border-b border-white/20 pb-2">
                    <h2 className="text-2xl font-bold">Stats</h2>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-4 mt-4">
                    <Card as="article" padding="sm">
                        <h3 className="text-xl text-muted">Games played</h3>
                    </Card>

                    <Card as="article" padding="sm">
                        <h3 className="text-xl text-muted">Games won</h3>
                    </Card>

                    <Card as="article" padding="sm">
                        <h3 className="text-xl text-muted">Win rate</h3>
                    </Card>
                </div>
            </section>
        </main>
    );
}

export default Profile;
