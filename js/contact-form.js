// Contact Form Handler for FoundersMitra
// Handles form submission via AJAX without page reload

(function($) {
  'use strict';

  const FORM_ID = '#wf-form-Contact-Form';
  const API_ENDPOINT = '/api/contact';

  // Initialize form handler when DOM is ready
  function initContactForm() {
    const $form = $(FORM_ID);

    if ($form.length === 0) {
      console.warn('Contact form not found');
      return;
    }

    $form.on('submit', handleFormSubmit);
  }

  // Handle form submission
  async function handleFormSubmit(e) {
    e.preventDefault();

    const $form = $(this);
    const $submitBtn = $form.find('input[type="submit"]');
    const $successMsg = $('.w-form-done');
    const $errorMsg = $('.w-form-fail');

    // Get form data
    const formData = {
      name: $form.find('input[name="name"]').val().trim(),
      email: $form.find('input[name="email"]').val().trim(),
      subject: $form.find('input[name="Subject"]').val().trim(),
      message: $form.find('textarea[name="Message"]').val().trim()
    };

    // Client-side validation
    const validationError = validateForm(formData);
    if (validationError) {
      showError(validationError);
      return;
    }

    // Disable submit button and show loading state
    const originalValue = $submitBtn.val();
    $submitBtn.prop('disabled', true).val('Sending...');
    hideMessages();

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showSuccess(data.message);
        $form[0].reset();
      } else {
        showError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      showError('Network error. Please check your connection and try again.');
    } finally {
      $submitBtn.prop('disabled', false).val(originalValue);
    }
  }

  // Validate form data
  function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.name || data.name.length < 2) {
      return 'Please enter your name (at least 2 characters).';
    }

    if (data.name.length > 100) {
      return 'Name is too long (maximum 100 characters).';
    }

    if (!data.email || !emailRegex.test(data.email)) {
      return 'Please enter a valid email address.';
    }

    if (!data.subject || data.subject.length < 3) {
      return 'Please enter a subject (at least 3 characters).';
    }

    if (data.subject.length > 200) {
      return 'Subject is too long (maximum 200 characters).';
    }

    if (!data.message || data.message.length < 10) {
      return 'Please enter a message (at least 10 characters).';
    }

    if (data.message.length > 5000) {
      return 'Message is too long (maximum 5000 characters).';
    }

    return null;
  }

  // Show success message
  function showSuccess(message) {
    const $successMsg = $('.w-form-done');
    const $errorMsg = $('.w-form-fail');
    const $form = $(FORM_ID);

    // Update success message text if provided
    if (message) {
      $successMsg.find('div').text(message);
    }

    // Show success, hide error and form
    $successMsg.show();
    $errorMsg.hide();
    $form.hide();

    // Scroll to success message
    $('html, body').animate({
      scrollTop: $successMsg.offset().top - 100
    }, 500);

    // Reset and show form after 5 seconds
    setTimeout(() => {
      $successMsg.hide();
      $form.show();
      $form[0].reset();
    }, 5000);
  }

  // Show error message
  function showError(message) {
    const $errorMsg = $('.w-form-fail');
    const $successMsg = $('.w-form-done');

    // Update error message text
    $errorMsg.find('div').text(message);

    // Show error, hide success
    $errorMsg.show();
    $successMsg.hide();

    // Scroll to error message
    $('html, body').animate({
      scrollTop: $errorMsg.offset().top - 100
    }, 500);

    // Auto-hide error after 8 seconds
    setTimeout(() => {
      $errorMsg.fadeOut();
    }, 8000);
  }

  // Hide all messages
  function hideMessages() {
    $('.w-form-done, .w-form-fail').hide();
  }

  // Initialize on document ready
  $(document).ready(initContactForm);

})(jQuery);
