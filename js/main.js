addEventListener("DOMContentLoaded", (event) => {
  document.querySelectorAll("#vibratingLink").forEach((item) =>
    item.addEventListener("click", function (event) {
      event.preventDefault();
      this.classList.add("vibrate");
      setTimeout(() => {
        this.classList.remove("vibrate");
      }, 500);
    })
  );

  document.querySelectorAll(".accordion-header").forEach((header) => {
    header.addEventListener("click", function () {
      const item = this.parentElement;
      const isActive = item.classList.contains("active");

      document.querySelectorAll(".accordion-item").forEach((accItem) => {
        accItem.classList.remove("active");
      });
      document.querySelectorAll(".accordion-divider").forEach((accItem) => {
        accItem.classList.remove("active");
      });

      if (!isActive) {
        item.querySelector(".accordion-divider").classList.add("active");
        item.classList.add("active");
      }
    });
  });

  const dropArea = document.getElementById("dropArea");
  const fileInput = document.getElementById("fileInput");
  const textIndicator = document.getElementById("messageIndic");

  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    dropArea.addEventListener(eventName, (e) => e.preventDefault(), false);
    document.body.addEventListener(eventName, (e) => e.preventDefault(), false);
  });

  ["dragenter", "dragover"].forEach((eventName) => {
    dropArea.addEventListener(
      eventName,
      () => {
        dropArea.classList.add("highlight");
      },
      false
    );
  });

  ["dragleave", "drop"].forEach((eventName) => {
    dropArea.addEventListener(
      eventName,
      () => {
        dropArea.classList.remove("highlight");
      },
      false
    );
  });

  dropArea.addEventListener("drop", (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;

    if (files && files.length > 0) {
      fileInput.files = files;
      textIndicator.innerHTML = `Dropped file: ${fileInput.files[0].name}`;
      console.log("Dropped file:", fileInput.files[0]);
    }
  });

  dropArea.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", () => {
    if (fileInput.files && fileInput.files.length > 0) {
      textIndicator.innerHTML = `Selected file: ${fileInput.files[0].name}`;
      console.log("Selected file:", fileInput.files[0]);
    }
  });
});
$(document).ready(function () {
  $.get("http://numbersapi.com/1/30/", function (data) {
    console.log(data);

    $(".sub-title").html(
      data +
        "<br/><br/> This Text was written by Jquery using API http://numbersapi.com/1/30/"
    );
  }).fail(function () {
    $(".sub-title").html("<p>Error fetching data!</p>");
  });

  $(".uploadBtn").click(function () {
    const file = $("#fileInput")[0].files[0];
    if (!file) {
      alert("No file selected!");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);

    $.ajax({
      url: "http://192.168.11.114:3000/upload",
      type: "POST",
      data: formData,
      contentType: false,
      processData: false,
      success: function (response) {
        alert("Upload success:", response);
        console.log("Upload success:", response);
      },
      error: function (xhr, status, error) {
        alert("Upload error:", error);
        console.error("Upload error:", error);
      },
    });
  });
  $("#form-data").submit(function (e) {
    e.preventDefault();
    $.ajax({
      url: "http://192.168.11.114:3000/addUser",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        email: $("#email")[0].value,
        password: $("#password")[0].value,
        type: "client",
        active: 1,
      }),
      success: function (response) {
        alert("Insert success:", response);
        console.log("Insert success:", response);
      },
      error: function (xhr, status, error) {
        alert("Insert error:", error);
        console.error("Insert error:", error);
      },
    });
  });
});
