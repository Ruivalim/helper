"use strict";

$(document).ready(function () {
  // Select initialize
  $('.select').click(function (e) {
    if (!$(e.target).is("input")) {
      $(this).attr('tabindex', 1).focus();
      $(this).toggleClass('active');
      $(this).find('.select-options').slideToggle(300);
    }
  });
  $('.select .select-options li').click(function () {
    if (!$(this).hasClass("searchBox")) {
      $(this).parents('.select').find('span').text($(this).text());
      $(this).parents('.select').find('input').attr('value', $(this).attr('value'));
    }
  });
  $(".select .select-options li input").keyup(function (e) {
    var search = $(this).val();
    var options = $(this).parents('.select-options').find('li');
    options.each(function (index, item) {
      if (!$(item).hasClass("searchBox")) {
        if ($(item).attr('value').toLowerCase().includes(search.toLowerCase()) || $(item).text().toLowerCase().includes(search.toLowerCase())) {
          $(item).removeClass("hidden");
        } else {
          $(item).addClass("hidden");
        }
      }
    });
  }); // Menu Hamburguer

  $(".menuHamburguer").click(function () {
    $(this).toggleClass("open");
  });
});