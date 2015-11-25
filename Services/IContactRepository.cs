using System.Collections.Generic;
using AngularIntro.Models;

namespace AngularIntro.Services
{
    public interface IContactRepository
    {
        IEnumerable<Contact> GetAll();
        int AddContact(Contact contact);
        void DeleteContact(int id);
        void UpdateContact(Contact contact);
    }
}