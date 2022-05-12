# A simple app to test API-first design

This simple application is trialprototype for testing OpenAPI contracts as a means of generating front end and backend boilerplate, documentation, and a live mock-data server for rapid UI creation.

### Featuring...

OpenAPI 3.0.2, openapi-generator, and prism in a simple React app 

### To Run:

Use `npm start` to spin up the react development server.
Use `npm run watch` to run the Prism mock http server and monitor the openapi.yml for changes.

##  OpenAPI Contract-Driven, Design-First Walkthrough
 1. Check out branch `add-reviews-ui`
 2. A new Reviews component has been added along with some basic logic on the Cats component to display reviews from customers.
 3. Add schemas to the `openapi.yml` for NewReview (creating a review):
 ```
    NewReview:
      type: object
      required:
      - author
      - rating
      - title
      properties:
        author:
          type: string
          x-faker: internet.userName
        rating:
          type: number
          enum: [1, 2, 3, 4, 5]
          example: 4
        title:
          type: string
          maxLength: 250
          x-faker: company.catchPhrase
        comment:
          type: string
          x-faker: lorem.paragraph
        id:
          type: string
          format: uuid
          x-faker: datatype.uuid
 ```
 4. And for Review (getting reviews)--which has different required fields:
 ```
    Review:
      type: object
      required:
      - author
      - id
      allOf:
      - $ref: '#/components/schemas/NewReview'
 ```
5. Now we'll add an array of reviews to the Cat schema, as well as an overall Rating Average:
```
        reviews:
          type: array
          items: 
            $ref: '#/components/schemas/NewReview'
        rating:
          type: number
          enum: [1, 2, 3, 4, 5]
          example: 4
```
6.  Save and the SDK will rebuild, so let's test getting the reviews!
  - Go to Cats.tsx
  - Scroll down to the first two TODOs and pull each Cat's `rating` into their Rating value displays, available on the Cat object's `.rating` now.
7. Check that it's working, and then... Scroll down to the last TODO and map in the review data that should now be available on the Cat object:
  ```
  {selectedCat?.reviews?.length && selectedCat.reviews?.map(review => (
                        <Grid item>
                            <div style={{width: "600px"}}>
                                <Review review={review}/>
                                <hr  />
                            </div>
                        </Grid>
                    ))}
  ```
  