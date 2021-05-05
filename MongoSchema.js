{
  "product_id": integer,
  "reviews":
    [{
      "review_id": INT autoincrement,
      "rating": integer,
      "summary": string,
      "recommend": bool,
      "response": string,
      "body": string,
      "date": string,
      "reviewer_name": string,
      "helpfulness": integer,
      "photos": [
        {
          "id": integer autoincrement,
          "url": string
        }
      ],
      "reported": bool
    }],
    "ratings": {
      "1": integer,
      "2": integer,
      "3": integer,
      "4": integer,
      "5": integer
    },
    "recommended": {
      "false": integer,
      "true": integer
    },
    "characteristics": {
      "Fit": {
        "id": integer autoincrement,
        "value": string
      },
      "Length": {
        "id": integer autoincrement,
        "value": string
      },
      "Comfort": {
        "id": integer autoincrement,
        "value": string
      },
      "Quality": {
        "id": integer autoincrement,
        "value": string
      },
      "Size": {
        "id": integer autoincrement,
        "value": string
      },
      "Width": {
        "id": integer autoincrement,
        "value": string
      }
    }
}

