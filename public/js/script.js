$(".table").hide();

$(document).ready(function () {
  //get request

  $("#submit").click(function () {
    $.ajax({
      url: "http://localhost:3000/cars",
      success: function (html) {
        final(html);
      },
    });
    $(".table").toggle();
  });

  //post request

  $("#postForm").submit(function (event) {
    event.preventDefault();
    let formData = {
      id: parseInt($("#id").val()),
      model: $("#model").val(),
      color: $("#color").val(),
      price: parseInt($("#price").val()),
    };

    $.ajax({
      method: "post",
      type: "post",
      url: "http://localhost:3000/cars",
      data: formData,
      dataType: "json",
      encode: true,
      success: function (data) {
        console.log(data);
      },
    });
  });

  //delete request
  $("#deleteForm").submit(function (event) {
    event.preventDefault();
    let formData = {
      id: parseInt($("#id1").val()),
    };
    // validation
    if (typeof parseInt($("#id1").val()) !== "number") {
      alert("Id must be a number");
    }
    $.ajax({
      method: "post",
      type: "post",
      url: "http://localhost:3000/cars/delete",
      data: formData,
      dataType: "json",
      encode: true,
      success: function (data) {
        console.log(data);
      },
    });
  });

  //put request
  $("#putForm").submit(function (event) {
    event.preventDefault();
    let formData = {
      id: parseInt($("#id2").val()),
      model: $("#model2").val(),
      color: $("#color2").val(),
      price: parseInt($("#price2").val()),
    };

    // validation
    if (
      typeof parseInt($("#id2").val()) !== "number" &&
      typeof parseInt($("#price2").val()) !== "number"
    ) {
      alert("Id and Price must be a number");
    }
    $.ajax({
      method: "post",
      type: "post",
      url: "http://localhost:3000/cars/update",
      data: formData,
      dataType: "json",
      encode: true,
      success: function (data) {
        console.log(data);
      },
    });
  });
});

let final = (result) => {
  let target = document.getElementById("target");
  target.innerHTML = `${result
    .map((i) => {
      return `<tr class = "tablebody">
    <td>${i.id}</td>
    <td>${i.model}</td>
    <td>${i.color}</td>
    <td>${i.price}</td>
  </tr>`;
    })
    .join("")}`;
};
