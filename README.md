# A simple app to test API-first design

This simple application is trialprototype for testing OpenAPI contracts as a means of generating front end and backend boilerplate, documentation, and a live mock-data server for rapid UI creation.

### Featuring...

OpenAPI 3.0.2, openapi-generator-cli (SEE https://openapi-generator.tech/), and Prism mock http server, in a simple React app 

### To Run:

Use `npm start` to spin up the react development server.
Use `npm run watch` to run the Prism mock http server and monitor the openapi.yml for changes.

##  OpenAPI Contract-Driven, Design-First Walkthrough
 1. Check out branch `add-reviews-ui`
 2. New reviews components have been added, along with basic logic on the Cats component to display and invite customer reviews. However, none of it is functional.
 3. So, open up the `openapi.yml` and add a schema for NewReview (creating a review):
 ```
    NewReview:
      type: object
      required:
      - author
      - rating
      - title
      - catId
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
        catId:
          type: string
          format: uuid
          x-faker: datatype.uuid
        id:
          type: string
          format: uuid
          x-faker: datatype.uuid
 ```
 4. ...as well as for Review (getting reviews)--which has different required fields:
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
6.  When you save, notice that the SDK will rebuild. So let's see the reviews!
  - Go to Cats.tsx
  - Scroll down to the first two TODOs and pull each Cat's `rating` into their Rating value displays, available on the Cat object's `.rating` now. Check if the page now shows mock data.
7. And then, scroll down to the last TODO and map out the review data that should now be available on the Cat object:
  ```
  {selectedCat?.reviews?.length && selectedCat.reviews?.map(review => (
                        <Grid item key={review.id}>
                            <div style={{width: "600px"}}>
                                <Review review={review}/>
                                <hr  />
                            </div>
                        </Grid>
                    ))}
  ```
  8. Now we'll add a new POST route to save user reviews. Go back to openapi.yml and create a path called `/cats/reviews` and be sure to tag it "cat" so it will group with the cat APIs:
  ```
  /cats/reviews:
    post:
      summary: Post review of a Cat
      operationId: postCatReview
      tags:
        - cat
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewReview'
      responses:
        '201':
          description: 'Created'
        default:
          $ref: '#/components/responses/Error'
  ```
9. We just created an API endpoint that can be used via the function we named `postCatReview` (operationId). Since we tagged it "cat," we know we can find it among the catAPI methods. So, go to `actions/cats` and export the new POST method as an asynchronous function. The CatApi class has already been instantiated, so we can simply access the method (our POST endpoint) with `catApi.postCatReview`:
```
// POST cat review
export const createCatReview = async (req: NewReview) => {
    try {
        const { status } = await catApi.postCatReview(req);
        if (status === 201) console.log("Thank you for your review!")
      } catch (e) {
          console.error(e);
      }
}
```
10. Next, head to `components/CatsPage/NewReviewForm.tsx` and scroll down through the TODOs to uncomment sections of code. Then, try out our new POST action by adding it to the form's submitRating method, above `handleClose()`:
```
    const newReview = {
      author: user.userName,
      rating, 
      title,
      comment,
      catId: uuid
    }
    createCatReview(newReview);
```
11. And that's it! The form has already been created, so now we can test whether it sends a working POST request. Prism will automatically validate based on our required fields and their types. So, return to the Cats page in the browser. Try adding a review to a cat and see what hapens in your DevTools Network tab.

NOTE: Using a mock HTTP server does not actually save anything anywhere. It does, however, allow us to create and test all the necessary infrastructure for when we are connected to a real server.


### Backend Tools

Is all the love for the FE only? --No, it is not. The awesome thing about OpenAPI contracts is that they allow for more rapid development across the stack. Part of that lies with the contract itself--both front-end and back-end know what an API needs to provide. Furthermore, we can generate some useful boilerplate for the backend too!

In a terminal in this project's directory, create a /server directory, cd into it, and run `npx @openapitools/openapi-generator-cli generate -g nodejs-express-server -i ../openapi.yml` to generate a server stub. 

A server stub contains no business logic or database coneection (that's up to you). It does, however, generate a server and provide a boilerplate structure for all your API endpoints. 


### Documentation

If you want to generate some HTML documentation of your API, you can use https://app.swaggerhub.com -- Just paste your spec in the editor and use the exports tab. SwaggerHub also offers client SDK and server stub generators. 

### Testing

`openapi-generator-cli` appears to have options for generating model and api tests, though I have not investigated them yet.