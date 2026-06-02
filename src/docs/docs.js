(function() {
  function getCard(node) {
    return node.closest(".example-card");
  }

  function getActiveCode(card) {
    return card.querySelector(".example-code pre.active code");
  }

  function showToast() {
    var toast = document.querySelector(".copy-toast");
    if (!toast) return;
    toast.classList.add("show");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(function() {
      toast.classList.remove("show");
    }, 1600);
  }

  document.querySelectorAll(".example-tabs[role='tablist']").forEach(function(group) {
    group.removeAttribute("role");
  });

  document.querySelectorAll(".example-code pre").forEach(function(block) {
    block.setAttribute("tabindex", "0");
  });

  document.addEventListener("click", function(event) {
    var tab = event.target.closest("[data-example-tab]");
    if (tab) {
      var card = getCard(tab);
      var name = tab.getAttribute("data-example-tab");
      card.querySelectorAll("[data-example-tab]").forEach(function(item) {
        item.classList.toggle("active", item === tab);
      });
      card.querySelectorAll("[data-example-panel]").forEach(function(panel) {
        panel.classList.toggle("active", panel.getAttribute("data-example-panel") === name);
      });
      return;
    }

    var copy = event.target.closest("[data-copy-active]");
    if (copy) {
      var code = getActiveCode(getCard(copy));
      if (!code) return;
      navigator.clipboard.writeText(code.textContent).then(showToast, showToast);
      return;
    }

    var expand = event.target.closest("[data-expand-example]");
    if (expand) {
      var expandedCard = getCard(expand);
      expandedCard.classList.toggle("expanded");
      var icon = expand.querySelector("i");
      if (icon) {
        icon.className = expandedCard.classList.contains("expanded")
          ? "pdei-icon pdei-icon-minimize-2"
          : "pdei-icon pdei-icon-maximize-2";
      }
      return;
    }

    var toastTrigger = event.target.closest("[data-docs-toast]");
    if (toastTrigger && window.Pdei && window.Pdei.showToast) {
      window.Pdei.showToast("Operación completada.", { variant: "success", position: "top-right" });
    }
  });

  document.addEventListener("input", function(event) {
    var input = event.target.closest("[data-otp-input]");
    if (!input) return;
    var group = input.closest(".otp-group");
    var inputs = Array.prototype.slice.call(group.querySelectorAll("[data-otp-input]"));
    input.value = input.value.replace(/\D/g, "").slice(0, 1);
    input.classList.toggle("filled", input.value.length > 0);
    if (input.value) {
      input.classList.remove("active");
      var next = inputs[inputs.indexOf(input) + 1];
      if (next) next.focus();
    }
  });

  document.addEventListener("keydown", function(event) {
    var input = event.target.closest("[data-otp-input]");
    if (!input || event.key !== "Backspace" || input.value) return;
    var inputs = Array.prototype.slice.call(input.closest(".otp-group").querySelectorAll("[data-otp-input]"));
    var previous = inputs[inputs.indexOf(input) - 1];
    if (previous) previous.focus();
  });

  document.addEventListener("focusin", function(event) {
    var input = event.target.closest("[data-otp-input]");
    if (!input) return;
    input.closest(".otp-group").querySelectorAll("[data-otp-input]").forEach(function(item) {
      item.classList.toggle("active", item === input);
    });
  });
})();
