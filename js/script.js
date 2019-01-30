// Page loads with the name field ready for input.
$('#name').focus();


 /* ”Job Role” section
 If the user chooses the option 'Other' in the dropdown menu an input box
 appears for the description of the role.
 */
$('#other-title').hide();
$('#title').on('change', () => {
  if ($('#title option:selected').val() === 'other') {
    $('#other-title').slideDown();
  } else {
      $('#other-title').hide();
  }
});


/* ”T-Shirt Info” section
In this section the Color Menu is unclickable by default and only becomes
available when one of the T-shirt designs is selected. Then the color options
are available accordingly to the design selected. Each design has three
exclusive colors.
*/
$('#color').addClass('disabled-option').prop('disabled', true);
$('#design').on('change', () => {
  if ($('#design option:selected').val() === 'js puns') {
    $('#color').removeClass('disabled-option').prop('disabled', false);
    $('#color').children().hide();
    $('#color option').eq(1).show();
    $('#color option').eq(2).show();
    $('#color option').eq(3).show();
    } else if ($('#design option:selected').val() === 'heart js') {
        $('#color').removeClass('disabled-option').prop('disabled', false);
        $('#color').children().hide();
        $('#color option').eq(4).show();
        $('#color option').eq(5).show();
        $('#color option').eq(6).show();
      } else if ($('#design option:selected').text() === 'Select Theme') {
          $('#color').addClass('disabled-option').prop('disabled', true);
        }
});


/* ”Register for Activities” section
This ensures that when an activity is chosen if another one is at the same date
and time it cannot be checked.
*/
const frameworks = $("input[name*='js-frameworks']");
const express = $("input[name*='express']");
const libraries = $("input[name*='js-libs']");
const node = $("input[name*='node']");

function scheduleCrash(firstCourse, secondCourse) {
  firstCourse.on('change', function() {
    if ($(this).is(':checked')) {
      secondCourse.attr('disabled','disabled').parent().addClass('disabled-option');
    } else {
        secondCourse.removeAttr('disabled').parent().removeClass('disabled-option');
    }
  });
}

scheduleCrash(frameworks, express);
scheduleCrash(express, frameworks);
scheduleCrash(libraries, node);
scheduleCrash(node, libraries);


/*
This sums the total price of the selected activities and displays at the end of
the section.
*/
const activities = $(".activities");
activities.append("<span id='total'></span>");
$('#total').text(`Total: $${0}`);

$("input:checkbox").each(function(index, element) {
  if (index === 0) {
    $(element).prop('value', 200);
  } else {
    $(element).prop('value', 100);
  }
});

$("input:checkbox").on('click', function() {
  let totalCost = 0;
  $("input:checkbox").each(function() {
    if ($(this).is(':checked')) {
      totalCost += Number($(this).val());
    }
  });
  $('#total').text(`Total: $${totalCost}.00`);
});


/* •	"Payment Info" section
Displays only the information regarding the selected option and has credit
card as the default payment method.
*/
$('#paypal, #bitcoin').hide();
$('#payment option[value="credit card"]').prop('selected', true);
$('#payment option[value="select_method"]').prop('disabled', true);

$('#payment').on('change', () => {
  if ($('#payment option:selected').val() === 'credit card') {
    $('#credit-card').slideDown();
    $('#paypal, #bitcoin').hide();
  } else if ($('#payment option:selected').val() === 'paypal') {
      $('#paypal').slideDown();
      $('#credit-card, #bitcoin').hide();
    } else if ($('#payment option:selected').val() === 'bitcoin') {
        $('#bitcoin').slideDown();
        $('#credit-card, #paypal').hide();
      }
});


/*•	Form validation
Grouped functions for each item that needs validation
*/
function validName() {
  let name = $('#name').val();
  if (name !== '') {
    $('.error').remove();
    return true;
  } else if ($('.error').length) {
      return false;
    } else {
        $('#name').after("<span class='error'>Please type in your name</span>");
        return false;
      }
}

function validEmail() {
  let email = /^[^@]+@[^@.]+\.[a-z]+$/i.test($('#mail').val());
  if (email) {
    $('.error').remove();
    return true;
    } else if ($('.error').length) {
        return false;
      } else if (!email) {
          $('#mail').after("<p class='error'>Please provide a valid email address</p>");
          return false;
        }
}

function validCheckbox() {
  let checkboxChecked = $('.activities input:checked').length > 0;
  if (checkboxChecked) {
    $('.error').remove();
    return true;
    } else if ($('.error').length) {
        return false;
      } else if (!checkboxChecked) {
          $('.activities').after("<p class='error'>At least one activity must be checked</p>");
          return false;
        }
}

function validCreditCard() {
  let creditCard = /^[0-9]{13,16}$/.test($('#cc-num').val());
  if ($('#payment option:selected').val() === 'credit card') {
    if (creditCard) {
      $('.error').remove();
      return true;
    } else if ($('.error').length) {
        return false;
      } else if (!creditCard) {
          $('#payment').after("<p class='error'>Invalid credit card number</p>");
          return false;
        }
  } else {
      return true;
    }
}

function validZipCode() {
  let zipCode = /^[0-9]{5}$/.test($('#zip').val());
  if ($('#payment option:selected').val() === 'credit card') {
    if (zipCode) {
      $('.error').remove();
      return true;
    } else if ($('.error').length) {
        return false;
      } else if (!zipCode) {
          $('#payment').after("<p class='error'>Invalid zip code</p>");
          return false;
        }
  } else {
      return true;
    }
}

function validCVV() {
  let cvv = /^[0-9]{3}$/.test($('#cvv').val());
  if ($('#payment option:selected').val() === 'credit card') {
    if (cvv) {
      $('.error').remove();
      return true;
    } else if ($('.error').length) {
        return false;
      } else if (!cvv) {
          $('#payment').after("<p class='error'>Invalid CVV</p>");
          return false;
        }
  } else {
      return true;
    }
}


/*•	Form validation
If items are not valid give error messages before user tries to submit, then
check if all items are valid before allowing to sumbit.
*/
$('#name').focusout(() => {validName();});

$('#mail').focusout(() => {validEmail();});

$('.activities').change(() => {validCheckbox();});

$('#cc-num').focusout(() => {validCreditCard();});

$('#zip').focusout(() => {validZipCode();});

$('#cvv').focusout(() => {validCVV();});

$('button').on('click', () => {
  if(validName() &&
     validEmail() &&
     validCheckbox() &&
     validCreditCard() &&
     validZipCode() &&
     validCVV()) {
    return true;
  } else {
    return false;
  }
});
