import { faker } from '@faker-js/faker';

const apiHost = 'http://localhost:4200/api/';

describe('Posts API', () => {
  context('GET /api/posts', () => {
    it('gets a list of posts', () => {
      cy.request('GET', `${apiHost}posts`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).have.length(100);
      });
    });
  });

  context('GET /api/posts/ID', () => {
    it('gets a second post', () => {
      const postId = 2;
      const secondPost = {
        userId: 1,
        title: 'qui est esse',
        body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
      };

      cy.request('GET', `${apiHost}posts/${postId}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.equal({ id: postId, ...secondPost }
      );
      });
    });
  });

  context('POST /api/post', () => {
    it('create a new post', () => {
      const newPost = {
        userId: 1,
        title: faker.lorem.sentence(),
        body: faker.lorem.text(),
      };

      cy.request('POST', `${apiHost}posts/`, newPost).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.deep.equal({
          id: 101,
          ...newPost,
        });
      });
    });

    it('error when invalid field sent', () => {
      const invalidPost = {
        notAPostField: 'NOT A POST FIELD',
      };

      cy.request({ method: 'POST', url: `${apiHost}posts/`, failOnStatusCode: false, body: invalidPost }).then(
        (response) => {
          expect(response.status).to.eq(201);
          expect(response.body).to.deep.equal({
            id: 101,
            ...invalidPost,
          });
        }
      );
    });
  });

  context('PATCH /api/post/ID', () => {
    it('create a new post', () => {
      const postID = 2;
      const updatedPost = {
        userId: 2,
        title: 'New Text',
        body: "NewDescription",
      };

      cy.request('PATCH', `${apiHost}posts/${postID}`, updatedPost).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.equal({
          id: postID,
          ...updatedPost
        });
      });
    });
  });

  context('DELETE /api/post/ID', () => {
    it('delete a post', () => {
      const postId = 2;

      cy.request('DELETE', `${apiHost}posts/${postId}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.equal({});
      });
    });
  });
});

describe('Comments API', () => {
  context('GET /api/posts/postID/comments', () => {
    it('gets a list of comments', () => {
      const postId = 2;

      cy.request('GET', `${apiHost}posts/${postId}/comments`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).have.length(5);
      });
    });
  });
});
