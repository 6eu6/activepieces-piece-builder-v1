# UX Guidelines for Building Automation Pieces

This document provides practical advice for creating user-friendly automation pieces with dynamic dropdowns and secure credential handling.

## 1. Use Dynamic Dropdowns Instead of Raw IDs

- Avoid requiring users to type raw IDs or codes.
- Use dynamic dropdowns that load options asynchronously from APIs or config.
- Show human-readable labels with descriptions or disambiguators.
- Example: Instead of asking for a "country code", provide a dropdown with country names and codes.

## 2. Provide Clear, Instructional Descriptions

- Write descriptions assuming users have no prior API knowledge.
- Explain what to enter and how to find it.
- Use examples where helpful.
- Avoid jargon or vague terms.

## 3. Secure Credential Handling

- Never expose raw API keys after initial entry.
- Store credentials encrypted and only show plaintext once on creation.
- Provide clear instructions on how to create and manage credentials.

## 4. Input Validation and Required Fields

- Mark required fields clearly.
- Validate inputs early and provide helpful error messages.

## 5. Consistent Naming and Structure

- Use consistent naming conventions for inputs, outputs, and actions.
- Group related inputs logically.

## 6. Feedback and Status Reporting

- Provide clear success or error messages after actions.
- Use output fields to return meaningful status or data.

## 7. Testing and Sample Data

- Include sample data for testing pieces locally.
- Document how to run tests and interpret results.

## 8. Accessibility and Localization

- Use accessible labels and descriptions.
- Plan for localization by avoiding hardcoded strings.

---

Following these guidelines will help create pieces that are easier to use, more secure, and maintainable.