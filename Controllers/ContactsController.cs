using System.Collections.Generic;
using System.Web.Http;
using AngularIntro.Filters;
using AngularIntro.Models;
using AngularIntro.Models.Validation;
using AngularIntro.Services;

namespace AngularIntro.Controllers
{
    public class ContactsController : ApiController
    {
        private readonly IContactRepository _contactRepository;

        public ContactsController(IContactRepository contactRepository)
        {
            _contactRepository = contactRepository;
        }

        [DelaySeconds(1)]
        public IEnumerable<Contact> Get()
        {
            return _contactRepository.GetAll();
        }

        public object Put(Contact contact)
        {
            if (ContactValidator.NewIsInvalid(contact))
                return BadRequest();
            var id = _contactRepository.AddContact(contact);
            return id;
        }

        public IHttpActionResult Delete(int id)
        {
            try
            {
                _contactRepository.DeleteContact(id);
                return Ok();
            }
            catch (KeyNotFoundException) { return NotFound(); }
        }

        public IHttpActionResult Post(Contact contact)
        {
            if (ContactValidator.ExistingIsInvalid(contact))
                return BadRequest();
            try
            {
                _contactRepository.UpdateContact(contact);
                return Ok();
            }
            catch (KeyNotFoundException) { return NotFound(); }
        }
    }
}