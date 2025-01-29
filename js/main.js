document.querySelectorAll("#vibratingLink").forEach((item)=>
    item.addEventListener("click", function(event) {
    event.preventDefault();
    this.classList.add("vibrate");
    setTimeout(() => {
      this.classList.remove("vibrate");
    }, 500);
  }));
  
document.querySelectorAll(".accordion-header").forEach(header => {
    header.addEventListener("click", function () {
      const item = this.parentElement;
      const isActive = item.classList.contains("active");

      document.querySelectorAll(".accordion-item").forEach(accItem => {
        accItem.classList.remove("active");
      });
      document.querySelectorAll(".accordion-divider").forEach(accItem => {
        accItem.classList.remove("active");
      });

      if (!isActive) {
        item.querySelector('.accordion-divider').classList.add("active");
        item.classList.add("active");
      }
    });
  });

