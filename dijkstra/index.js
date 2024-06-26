//다익스트라
//근래 A* 알고리즘이 더 많이 쓰임

class City {
  constructor(name) {
    this.name = name;
    this.adjacent_cities = {};
  }

  addAdjacentCity(city, distance) {
    this.adjacent_cities[city.name] = distance;
  }

  removeAdjacentCity(city) {
    delete this.adjacent_cities[city.name];
  }
}

class Dijkstra {
  constructor() {
    this.all_cities = {};
  }

  regiterCity(city) {
    this.all_cities[city.name] = city;
  }

  shortestPath(start_city, end_city) {
    let visited_cities = {};
    let unvisited_cities = {};
    let shortest_path_table = {};

    for (let city_name in this.all_cities) {
      unvisited_cities[city_name] = this.all_cities[city_name];
    }

    if (unvisited_cities[start_city.name] == null) {
      return null;
    } else {
      for (let city_name in unvisited_cities) {
        shortest_path_table[city_name] = { distance: Infinity, prevcity: null };
      }
    }
    shortest_path_table[start_city.name].distance = 0;
    visited_cities[start_city.name] = this.all_cities[start_city.name];

    let pivot_city = start_city.name;
    let pivot_distance = 0;

    while (Object.keys(unvisited_cities).length > 0) {
      let closest_city_name = null;
      for (let city_name in unvisited_cities) {
        if (
          closest_city_name == null ||
          shortest_path_table[city_name].distance <
            shortest_path_table[closest_city_name].distance
        ) {
          closest_city_name = city_name;
        }
      }
      visited_cities[closest_city_name] = unvisited_cities[closest_city_name];
      delete unvisited_cities[closest_city_name];

      for (let adjacent_city_name in visited_cities[closest_city_name]
        .adjacent_cities) {
        if (unvisited_cities[adjacent_city_name] == null) {
          continue;
        }
        let distance =
          shortest_path_table[closest_city_name].distance +
          visited_cities[closest_city_name].adjacent_cities[adjacent_city_name];

        if (shortest_path_table[adjacent_city_name].distance > distance) {
          shortest_path_table[adjacent_city_name].distance = distance;
          shortest_path_table[adjacent_city_name].prevcity = closest_city_name;
        }
      }
    }

    this.recursiveCheckPath(end_city.name, shortest_path_table, "");
    return shortest_path_table[end_city.name];
  }

  recursiveCheckPath(target, table, result) {
    if (table[target].prevcity == null) {
      result += target;
      console.log("finish");
      console.log(result);
      return result;
    }
    result = this.recursiveCheckPath(table[target].prevcity, table, result);
    result += "->" + target;
    console.log(result);
    return result;
  }
}

let dijkstra = new Dijkstra();

let seoul = new City("seoul");
let wonju = new City("wonju");
let gangneung = new City("gangneung");
let daejeon = new City("daejeon");
let jeonju = new City("jeonju");
let daegu = new City("daegu");
let busan = new City("busan");

dijkstra.regiterCity(seoul);
dijkstra.regiterCity(wonju);
dijkstra.regiterCity(gangneung);
dijkstra.regiterCity(daejeon);
dijkstra.regiterCity(jeonju);
dijkstra.regiterCity(daegu);
dijkstra.regiterCity(busan);

seoul.addAdjacentCity(wonju, 87);
seoul.addAdjacentCity(gangneung, 165);
seoul.addAdjacentCity(daejeon, 140);
seoul.addAdjacentCity(jeonju, 187);

wonju.addAdjacentCity(seoul, 87);
wonju.addAdjacentCity(gangneung, 95);
wonju.addAdjacentCity(daejeon, 118);
wonju.addAdjacentCity(daegu, 178);
wonju.addAdjacentCity(busan, 222);

gangneung.addAdjacentCity(seoul, 165);
gangneung.addAdjacentCity(wonju, 95);
gangneung.addAdjacentCity(daegu, 212);
gangneung.addAdjacentCity(busan, 272);

daejeon.addAdjacentCity(seoul, 140);
daejeon.addAdjacentCity(wonju, 118);
daejeon.addAdjacentCity(jeonju, 56);
daejeon.addAdjacentCity(daegu, 122);

jeonju.addAdjacentCity(seoul, 187);
jeonju.addAdjacentCity(daejeon, 56);
jeonju.addAdjacentCity(daegu, 130);

daegu.addAdjacentCity(wonju, 178);
daegu.addAdjacentCity(gangneung, 212);
daegu.addAdjacentCity(daejeon, 122);
daegu.addAdjacentCity(jeonju, 130);
daegu.addAdjacentCity(busan, 72);

busan.addAdjacentCity(daegu, 72);
busan.addAdjacentCity(wonju, 222);
busan.addAdjacentCity(gangneung, 272);

console.log(dijkstra.shortestPath(seoul, busan));
