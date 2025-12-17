"use server";
import Button from "@/components/button";
import Loading from "@/components/loading";
import { logout } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { Suspense } from "react";

export default async function DashboardPage() {
  const { data, error } = await supabase.from("announcements").select("*");

  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <>
      <Button text="Logout" onClick={logout} />
      <Suspense fallback={<Loading />}>
        {data.map((announcement) => {
          return (
            <ul key={announcement.id} className="my-3">
              <div>
                <h3>{announcement.title}</h3>
                <div>{new Date(announcement.created_at).toDateString()}</div>
                <p>{announcement.content}</p>
              </div>
            </ul>
          );
        })}
      </Suspense>
    </>
  );
}
