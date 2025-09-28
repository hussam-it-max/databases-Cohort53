const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const dbName = "databaseweek4";

async function getTotalPopulation(client, country) {
  const res = await client
    .db(dbName)
    .collection("population")
    .aggregate([
      { $match: { Country: country } },
      {
        $group: {
          _id: "$Year",
          countPopulation: { $sum: { $add: ["$M", "$F"] } },
        },
      },
    ]);

  return res.toArray();
}
async function getInformationOfPopulation(client, year, age) {
  const res = await client
    .db(dbName)
    .collection("population")
    .aggregate([
      { $match: { Year: year, Age: age } },
      { $addFields: { totalPopulation: { $add: ["$M", "$F"] } } },
      {
        $group: {
          _id: "$Continent",
          totalPopulation: { $sum: "$totalPopulation" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

  return res.toArray();
}

async function main() {
  const client = new MongoClient(url);
  try {
    await client.connect();
    console.log("Connected successfully to server");
    const information = await group(client, "Netherlands", 2020);
    console.log("Information:", information);

    const totalPopulation = await getTotalPopulation(client, "Netherlands");
    console.log("Total Population:", totalPopulation);
    const informationOfPopulation = await getInformationOfPopulation(
      client,
      2020,
      "100+"
    );
    console.log("Information Of Population:", informationOfPopulation);
  } catch (err) {
    console.log(err.message);
  } finally {
    await client.close();
  }
}
main();
