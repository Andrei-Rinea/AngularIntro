using System.Collections.Generic;
using System.IO;
using System.Linq;
using AngularIntro.Models;
using AngularIntro.Models.Converters;

namespace AngularIntro.Services
{
    public class CsvFileContactRepository : IContactRepository
    {
        private readonly string _filePath;

        public CsvFileContactRepository(string folder, string filename)
        {
            _filePath = Path.Combine(folder, filename);
        }

        public IEnumerable<Contact> GetAll()
        {
            if (!File.Exists(_filePath))
                yield break;

            using (var reader = new StreamReader(_filePath))
            {
                string line;
                while ((line = reader.ReadLine()) != null)
                    yield return ContactConverter.FromString(line);
            }
        }

        public int AddContact(Contact contact)
        {
            var contacts = GetAll().ToArray();
            var maxId = 0;
            if (contacts.Any())
                maxId = contacts.Max(c => c.Id);
            var id = maxId + 1;
            contact.Id = id;
            var contactLine = ContactConverter.ToString(contact);
            File.AppendAllLines(_filePath, new[] { contactLine });
            return id;
        }

        public void DeleteContact(int id)
        {
            var contacts = GetAll().ToList();
            var contact = contacts.SingleOrDefault(c => c.Id == id);
            if (contact == null)
                throw new KeyNotFoundException();
            contacts.Remove(contact);
            File.WriteAllLines(_filePath, contacts.Select(ContactConverter.ToString));
        }

        public void UpdateContact(Contact contact)
        {
            var contacts = GetAll().ToList();
            var existingContact = contacts.SingleOrDefault(c => c.Id == contact.Id);
            if (contact == null)
                throw new KeyNotFoundException();
            var index = contacts.IndexOf(existingContact);
            contacts[index] = contact;
            File.WriteAllLines(_filePath, contacts.Select(ContactConverter.ToString));
        }
    }
}