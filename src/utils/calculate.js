function* combinations(elements, length) {
  for (let i = 0; i < elements.length; i++) {
    if (length === 1) {
      yield [elements[i]];
    } else {
      let remaining = combinations(elements.slice(i + 1, elements.length), length - 1);
      for (let next of remaining) {
        yield [elements[i], ...next];
      }
    }
  };
}

function cartesian(...a) {
  return a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));
}

function simulateInheritance(mother, father, target, ivCount) {
  function rateStat(parentStat, targetStat) {
    if(!targetStat) {
      return 0;
    }
    return parentStat ? 1 : -1;
  }

  const inheritances = new Proxy({}, {
    get: (target, name) => { return name in target ? target[name] : 0 }
  });
  let total = 0;

  for(const i of combinations(['hp', 'atk', 'def', 'spa', 'spd', 'spe'], ivCount)) {
    const statLists = i.map((stat) => {
      return [rateStat(mother[stat], target[stat]), rateStat(father[stat], target[stat])];
    });
    total += cartesian(...statLists).length;
    cartesian(...statLists).filter(el=>!el.includes(-1)).forEach((el) => {
      inheritances[el.filter(el=>el===1).length]++;
    });
  }

  const odds = {};
  Object.keys(inheritances).forEach((key) => {
    odds[key] = inheritances[key]/total;
  });

  return odds;
}

function simulateRandom(inheritances, targetPerfects) {
  let totalOdds = 0;
  Object.keys(inheritances).forEach((key) => {
    totalOdds += inheritances[key] / (32 ** (targetPerfects - key));
  });
  return totalOdds;
}

function calculate(mother, father, target) {
  let ivCount = 3;
  if(mother['item'] === '5iv' || father['item'] === '5iv') {
    ivCount = 5;
  }
  const outcomes = simulateInheritance(mother, father, target, ivCount);
  const perfectsWanted = target['hp'] + target['atk'] + target['def'] + target['spa'] + target['spd'] + target['spe'];
  return simulateRandom(outcomes, perfectsWanted);
}

export default calculate;
