namespace AngularIntro.Models.Converters
{
    public static class ContactConverter
    {
        public static string ToString(Contact contact)
        {
            return contact.Id + "," + contact.Name + "," + contact.Email;
        }

        public static Contact FromString(string contactString)
        {
            var fragments = contactString.Split(',');
            var contact = new Contact
            {
                Id = int.Parse(fragments[0]),
                Name = fragments[1],
                Email = fragments[2]
            };
            return contact;
        }
    }
}