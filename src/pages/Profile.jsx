import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  MapPin,
  BriefcaseBusiness,
  Pencil,
  LoaderCircle,
} from "lucide-react";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, setUser } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/users/profile");

        if (response.data.success) {
          setProfile(response.data.user);
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Profile fetch failed:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load your profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [setUser]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="flex items-center gap-3 text-slate-400">
          <LoaderCircle className="animate-spin" size={22} />
          Loading profile...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-2xl rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
          <p className="text-red-400">{error}</p>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p className="text-slate-400">Profile not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-wider text-blue-500">
            WorkHub Profile
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            My Profile
          </h1>

          <p className="mt-2 text-slate-400">
            Manage your personal information and professional details.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">

          {/* Top section */}
          <div className="border-b border-slate-800 p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-5">
                
                {/* Profile image */}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-500/10 ring-1 ring-blue-500/20">
                  {profile.profileImage ? (
                    <img
                      src={profile.profileImage}
                      alt={profile.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="text-blue-500" size={34} />
                  )}
                </div>

                <div>
                  <h2 className="text-2xl font-bold">
                    {profile.name}
                  </h2>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium capitalize text-blue-400">
                      {profile.role}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                to="/profile/edit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-medium transition hover:bg-blue-700"
              >
                <Pencil size={18} />
                Edit Profile
              </Link>
            </div>
          </div>

          {/* Information */}
          <div className="grid gap-6 p-8 sm:grid-cols-2">

            <ProfileInfo
              icon={<Mail size={19} />}
              label="Email"
              value={profile.email || "Not provided"}
            />

            <ProfileInfo
              icon={<BriefcaseBusiness size={19} />}
              label="Role"
              value={profile.role || "Not provided"}
              capitalize
            />

            <ProfileInfo
              icon={<MapPin size={19} />}
              label="Location"
              value={profile.location || "Not provided"}
            />

            <ProfileInfo
              icon={<User size={19} />}
              label="Name"
              value={profile.name || "Not provided"}
            />

          </div>

          {/* Bio */}
          <div className="border-t border-slate-800 p-8">
            <h3 className="text-lg font-semibold">About</h3>

            <p className="mt-3 leading-7 text-slate-400">
              {profile.bio || "No bio added yet."}
            </p>
          </div>

          {/* Skills */}
          <div className="border-t border-slate-800 p-8">
            <h3 className="text-lg font-semibold">Skills</h3>

            {profile.skills && profile.skills.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-slate-400">
                No skills added yet.
              </p>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}

function ProfileInfo({
  icon,
  label,
  value,
  capitalize = false,
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
      <div className="flex items-center gap-2 text-blue-500">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>

      <p
        className={`mt-3 text-slate-200 ${
          capitalize ? "capitalize" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export default Profile;