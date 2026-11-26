import React, { useState, useEffect } from "react";
import { useTheme } from '../contexts/ThemeContext';
import { Input, Button, useToast } from "../components/ui";
import { profileSchema, type ProfileFormData } from "../schemas/profile";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AvatarUploader } from '../components/profile/AvatarUploader';
import { useAuth } from '../contexts/useAuth';
import MatchHistory from "../components/profile/History";
import { matches } from "../data/matches";
import StatCard from "../components/profile/StatCard";
import ScoreChart from "../components/profile/ScoreChart";
import CategoryChart from "../components/profile/CategoryChart";
import { CategoryStats } from "../data/categoryStats";

type Profile = {
    username:   string; 
    bio:        string;
};

function Profile() {
    const { user, updateUser } = useAuth();
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

    
    const [isEdit, setEdit] = useState(false);
    const [addFriend, setAddFriend] = useState(false);
    const [friendUsername, setFriendUsername] = useState("");
    
    const gamesPlayed = matches.length;
    const gamesWon = matches.filter((match) => match.score > match.opponentScore).length;
    const winRate = gamesPlayed > 0 ? Math.round((gamesWon / gamesPlayed) * 100) : 0;

    // Charge profil depuis backend
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('/api/users/me', {
                    method: 'GET',
                    credentials: 'include', //to save jwt in the front 
                });
                if (response.ok) {
                    const userData = await response.json();
                    const user = userData.user || userData;

                    const formattedProfile: Profile = {
                        username: user.userName || "",
                        bio: user.bio || "",
                    };

                    setProfile(formattedProfile);
                    reset(formattedProfile); //pre remplit formulaire
                }
            }
            catch (error){
                console.error("Error during thue update of the profile: ", error);

            }
        };

        fetchProfile();
    }, [reset]);


      const onSubmit = async (data: ProfileFormData) => {
        try {
            const payload = {
                userName: data.username,
                bio: data.bio,
            };

            const response = await fetch('/api/users/me', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json'},
                credentials: 'include', //to save jwt in the front 
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            // si username déjà pris : error
            if (!response.ok) {
                showToast({
                    title: "Error",
                    message: result.message || "Failed to update profile !",
                    variant: "error",
                });
                return;
            }
            
            const updatedUser = result.user || result;
            // garde le Header et le reste de l'app à jour (nouveau pseudo)
            updateUser({ userName: updatedUser.userName });
            setProfile({

                ...profile,
                username: updatedUser.userName || data.username,
                bio: updatedUser.bio ?? data.bio,
            });
            setEdit(false);
            
            showToast({
                title: "Success",
                message: "Your profile has been updated!",
                variant: "success",
            });
        }
        catch {
            showToast({
                title: "Network Error",
                message: "Unable to reach server",
                variant: "error",
            });
        }
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

    return (
        <main className={`min-h-screen px-4 py-16 ${isDark ?
    "bg-gradient-to-r from-violet-700 via-indigo-700 to-cyan-700" :
    "bg-gradient-to-r bg-blue-200 via-cyan-200 to-emerald-200"}`}>
            {user && (
                <div className="mb-8 space-y-3">
                    <h2 className="text-xl font-bold">{profile.username || user.userName}</h2>
                    <AvatarUploader
                        userName={user.userName}
                        avatarUrl={user.avatarUrl}
                        onChange={(avatarUrl) => updateUser({ avatarUrl })}
                    />
                </div>
            )}

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
                    <StatCard title="Games played" value={gamesPlayed} />
                    <StatCard title="Games won" value={gamesWon} />
                    <StatCard title="Win rate" value={`${winRate}%`} />
                </div>
            </section>

            <ScoreChart histories={matches}/>
            <CategoryChart categories={CategoryStats} />
            <MatchHistory matches={matches}/>
        </main>
    );
}

export default Profile;
