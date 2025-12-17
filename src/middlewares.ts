"use server";
import { NextRequest, NextResponse } from "next/server";
import { refresh } from "./lib/auth";
import { supabase } from "./lib/supabase";

export default async function middleware(request: NextRequest) {
  let {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);

  if (user) {
    const response = await refresh();
    if (response) {
      user = response.data.user;
    }
  }

  if (request.url.includes("login") && user) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }
  if (request.url.includes("dashboard") && !user) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    )
  }

  return NextResponse.next();
}
