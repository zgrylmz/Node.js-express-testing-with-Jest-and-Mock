// Mocking the API 
const axios = require("axios");
const getUserById = require("../ApiCall/getUserById");

jest.mock("axios");

describe("getUser",()=>{
    it("should mock the API ",async()=>{
        const mockUser = {id:1,title:"example",job:"sadas"};

        axios.get.mockResolvedValue({data:mockUser});

        const user = await getUserById(1);

        expect(user).toEqual(mockUser);
        expect(axios.get).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/todos/1")
    });


    //This code tests API without mocking it 
    it("should get real user data from API", async () => {
        const user = await getUserById(1);

        // expect(user).toHaveProperty("userId",1);
        expect(user).toHaveProperty("id");
        expect(user).toHaveProperty("title");
    });

});




