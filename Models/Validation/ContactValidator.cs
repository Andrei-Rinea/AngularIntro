using System;
using System.Net.Mail;

namespace AngularIntro.Models.Validation
{
    public static class ContactValidator
    {
        public static bool NewIsInvalid(Contact contact)
        {
            return
                string.IsNullOrEmpty(contact?.Name) ||
                string.IsNullOrEmpty(contact.Email) ||
                InvalidEmailAddress(contact.Email);
        }

        public static bool ExistingIsInvalid(Contact contact)
        {
            return
                contact?.Id <= 0 ||
                string.IsNullOrEmpty(contact?.Name) ||
                string.IsNullOrEmpty(contact.Email) ||
                InvalidEmailAddress(contact.Email);
        }

        private static bool InvalidEmailAddress(string emailAddress)
        {
            if (string.IsNullOrWhiteSpace(emailAddress))
                return true;
            try
            {
                // ReSharper disable once ObjectCreationAsStatement
                new MailAddress(emailAddress);
                return false;
            }
            catch (FormatException)
            {
                return true;
            }
        }
    }
}