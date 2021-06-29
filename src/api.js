const URL = "https://qu9o8tf14b.execute-api.us-east-2.amazonaws.com/Prod";

export const getAllItems = (callback) => {
  fetch(`${URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",

      Authorization: localStorage.getItem("id_token"),
    },
  })
    .then((resp) => resp.json())
    .then((result) => callback(null, result))
    .catch((err) => callback(err, null));
};

export const getUrl = (callback) => {
  fetch(`${URL}/url`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",

      Authorization: localStorage.getItem("id_token"),
    },
  })
    .then((resp) => resp.json())
    .then((result) => callback(null, result))
    .catch((err) => callback(err, null));
};

export const uploadImg = (url, body) => {
  fetch(`${url}`, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/fom-data",
    },
    body,
  });
};

export const getFood = (food, callback) => {
  fetch(
    `https://api.spoonacular.com/food/ingredients/search?apiKey=3d01ebdfea1b4a4ca4dbf3aed3152c6c&query=${food}&number=2`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((resp) => resp.json())
    .then((result) => callback(null, result))
    .catch((err) => callback(err, null));
};

export const getFoodNutrients = (id, callback) => {
  fetch(
    `https://api.spoonacular.com/food/ingredients/${id}/information?amount=100&unit=g&apiKey=3d01ebdfea1b4a4ca4dbf3aed3152c6c`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((resp) => resp.json())
    .then((result) => callback(null, result))
    .catch((err) => callback(err, null));
};

export const addIngredient = (data, callback) => {
  fetch(`${URL}/ingredient`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("id_token"),
    },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((result) => callback(null, result))
    .catch((err) => callback(err, null));
};

export const deleteIngredient = (id, callback) => {
  fetch(`${URL}/ingredient/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("id_token"),
    },
  })
    .then((resp) => resp.json())
    .then((result) => callback(null, result))
    .catch((err) => callback(err, null));
};

export const editIngredient = (body, id, callback) => {
  fetch(`${URL}/ingredient/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("id_token"),
    },
    body: JSON.stringify(body),
  })
    .then((resp) => resp.json())
    .then((result) => callback(null, result))
    .catch((err) => callback(err, null));
};
