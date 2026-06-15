import { cookies } from "next/headers";

export async function GET(request) {
  //const requestHeaders = new Headers(request.headers);
  //console.log(requestHeaders.get("Authorization"));

  const headerList = request.headers.get("Authorization");
  //   const headerList = await headers();
  //   console.log(headerList.get("Authorization"));
  console.log(headerList);

  const theme = request.cookies.get("theme");
  console.log(theme);

  const cookieStore = await cookies();
  cookieStore.set("resultsPerPage", "20");
  console.log(cookieStore);

  return new Response("<h1>Profile API data</h1>", {
    headers: {
      "Content-Type": "text/html",
      "Set-Cookie": "theme=dark",
    },
  });
}
