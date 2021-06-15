const stats = ['hp','atk','def','spa','spd','spe'];

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

function simulateInheritance(mother, father, target, ivCount, powerItem=undefined) {
  function rateStat(parentStat, targetStat) {
    if(!targetStat) {
      return 0;
    }
    return parentStat ? 1 : -1;
  }

  const odds = {};
  const inheritances = new Proxy(odds, {
    get: (target, name) => { return name in target ? target[name] : 0 }
  });

  for(const i of combinations(stats, ivCount)) {
    const fLists = i.map(el=>({'parent':'father','stat':el}));
    const iLists = cartesian(...i.map(el=>({'parent':'mother','stat':el}))
      .map((el, i)=>[el, fLists[i]])
    ).filter((list)=>{
      if(powerItem === undefined) {
        return true;
      }
      return list.some((el)=>{
        return powerItem['parent'] === el['parent'] && powerItem['stat'] === el['stat'];
      });
    });
    const statLists = iLists.map((outcome) => {
      return outcome.map((iStat) => {
        const source = iStat['parent'] === 'mother' ? mother : father;
        return rateStat(source[iStat['stat']], target[iStat['stat']]);
      });
    });
    inheritances['total'] += statLists.length;
    statLists
      .filter(el=>!el.includes(-1))
      .forEach((el) => {
        inheritances[el.filter(el=>el===1).length]++;
      });
  }

  return odds;
}

function combineSum(...args) {
  const results = {};
  Object.keys(Object.assign({}, ...args)).forEach((key)=>{
    args.forEach((arg)=>{
      results[key] = (results[key] ?? 0) + (arg[key] ?? 0);
    });
  });
  return results;
}

function simulateRandom(inheritances, targetPerfects) {
  Object.keys(inheritances).forEach((key) => {
    if(key === 'total') {
      inheritances[key] *= 32 ** targetPerfects;
      return;
    }
    inheritances[key] *= 32 ** key;
  });
  return inheritances;
}

function collateResults(results) {
  return {
    'num': Object.keys(results).reduce((acc, key) => {
      if(key === 'total') {
        return acc;
      }
      return acc + results[key];
    }, 0),
    'den': results['total']
  };
}

function simplify(fraction) {
  function gcd(a, b) {
    return b ? gcd(b, a%b) : a;
  }

  const divisor = gcd(fraction['num'], fraction['den']);
  return {
    'num': fraction['num']/divisor,
    'den': fraction['den']/divisor
  };
}

function calculate(mother, father, target, ability) {
  let ivCount = 3;
  if(mother['item'] === '5iv' || father['item'] === '5iv') {
    ivCount = 5;
  }

  const powerItems = [];
  if(stats.includes(mother['item'])) {
    powerItems.push({'parent': 'mother', 'stat': mother['item']});
  }
  if(stats.includes(father['item'])) {
    powerItems.push({'parent': 'father', 'stat': father['item']});
  }
  if(powerItems.length === 0) {
    powerItems.push(undefined);
  }

  const outcomes = combineSum(...powerItems.map((item)=>simulateInheritance(mother, father, target, ivCount, item)));
  const perfectsWanted = target['hp'] + target['atk'] + target['def'] + target['spa'] + target['spd'] + target['spe'];
  const fraction = collateResults(simulateRandom(outcomes, perfectsWanted));
  fraction['den'] *= 5;
  fraction['num'] *= parseInt(ability, 10);
  return simplify(fraction);
}

export default calculate;
