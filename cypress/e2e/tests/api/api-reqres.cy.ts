import { faker } from '@faker-js/faker';

const apiHost = 'https://reqres.in/api/';

describe('Posts API', () => {
  context('GET Users API', () => {
    const userAPI = 'users/';

    it('GET api/users', () => {
      cy.request('GET', `${apiHost}${userAPI}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).have.length(6);
      });
    });

    it('GET api/users/userID', () => {
      const userID = 5;
      const fiveUser = {
        email: "charles.morris@reqres.in",
        first_name: "Charles",
        last_name: "Morris",
        avatar: "https://reqres.in/img/faces/5-image.jpg"
      }

      cy.request('GET', `${apiHost}${userAPI}${userID}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.deep.equal({ ...fiveUser, id: userID });
      });
    });
  });

  context('PATCH api/users/userID', () => {
    const userAPI = 'users/';

    it('create a new post', () => {
      const userID = 5;
      const updatedUser = {
        body: faker.lorem.sentence(5),
        title:  faker.lorem.sentence(2),
      };

      cy.request('PATCH', `${apiHost}${userAPI}${userID}`, updatedUser).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).contain({
          ...updatedUser
        });
      });
    });
  });

  context('DELETE Users API', () => {
    const userAPI = 'users/';

    it('DELETE api/users/userID', () => {
      const userID = 5;

      cy.request('DELETE', `${apiHost}${userAPI}${userID}`).then((response) => {
        expect(response.status).to.eq(204);
        expect(response.body).to.deep.equal('');
      });
    });
  });
});
