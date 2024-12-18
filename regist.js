//import { endpointRegis } from "./../helper/url";

document
  .querySelector(".signup-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Ambil data dari form
    const formData = new FormData(this);
    const data = {
      Name: formData.get("nama"),
      PhoneNumber: formData.get("no_hp"),
      Email: formData.get("email"),
      Password: formData.get("password"),
    };

    console.log("Form data:", data);

    try {
      // Lakukan request POST ke endpoint signup
      const response = await fetch("https://asia-southeast2-awangga.cloudfunctions.net/bayarin/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      const responseData = await response.json();
      console.log("Response data:", responseData);

      if (!response.ok) {
        Swal.fire({
          title: "Registrasi Gagal",
          text: responseData.message || "Periksa kembali data Anda.",
          icon: "error",
          button: "OK",
        }).then(() => {
          console.log(responseData); // untuk memeriksa error dari server
        });
      }

      Swal.fire({
        title: "Pendaftaran Berhasil",
        text: "Anda akan diarahkan ke halaman login.",
        icon: "success",
        button: "OK",
      }).then(() => {
        window.location.replace("/login");
      });
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again.");
    }
  });
