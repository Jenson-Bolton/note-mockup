import { createClient } from "@supabase/supabase-js";
import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;

const supabaseUrl = "https://cinvrhnlxmkszbrirgxg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjIxNzMzMCwiZXhwIjoxOTUxNzkzMzMwfQ.AUCfgsxVNn7LyUIoqqxYsF4Rqs-CeQEkLNBwKBzkpBo";

const supabase = createClient(supabaseUrl, supabaseKey);

async function signUp(pEmail, pPassword, pFirstName, pLastName, pErrorElement) {
  const { user, session, error } = await supabase.auth.signUp(
    {
      email: pEmail,
      password: pPassword
    },
    {
      data: {
        first_name: pFirstName,
        last_name: pLastName
      }
    }
  );
  if (error) {
    displayError(error, pErrorElement);
  } else {
    sessionStorage.setItem("user_obj", JSON.stringify(user));
  }
}

async function signIn(pEmail, pPassword, pErrorElement) {
  const { user, session, error } = await supabase.auth.signIn({
    email: pEmail,
    password: pPassword
  });
  if (error) {
    displayError(error, pErrorElement);
  } else {
    sessionStorage.setItem("user_obj", JSON.stringify(user));
    sessionStorage.setItem("session_key", JSON.stringify(session));
  }
}

function displayError(error, errorElement) {
  errorElement.innerHTML = `<h1>${error.message}</h1>`;
}

signIn(
    "15BoltonT@nobel.herts.sch.uk",
    "jenson",
    document.getElementById("app")
).then(() => {});

console.log(JSON.parse(sessionStorage.getItem("user_obj")).id);

(async () => {
  const { data, error } = await supabase.storage.createBucket(
    JSON.parse(sessionStorage.getItem("user_obj")).id,
    { public: false }
  );
  console.log(data);
  console.log(error);
})();
