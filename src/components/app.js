import { h } from 'preact';
import { useState } from 'preact/hooks';
import Party from './party.js';
import calculate from '../utils/calculate.js';

function onSubmit(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const mother = {'item': data.get('mother_item')};
  const father = {'item': data.get('father_item')};
  const target = {};
  for(const i of ['hp', 'atk', 'def', 'spa', 'spd', 'spe']) {
    if(i === 'item') {
    }
    mother[i] = data.get('mother_' + i) === 'on';
    father[i] = data.get('father_' + i) === 'on';
    target[i] = data.get('child_' + i) === 'on';
  }
  return calculate(mother, father, target, data.get('ability'));
}

const App = () => {
  const [motherItem, setMotherItem] = useState('');
  const [motherHp, setMotherHp] = useState(false);
  const [motherAtk, setMotherAtk] = useState(false);
  const [motherDef, setMotherDef] = useState(false);
  const [motherSpa, setMotherSpa] = useState(false);
  const [motherSpd, setMotherSpd] = useState(false);
  const [motherSpe, setMotherSpe] = useState(false);

  const [fatherItem, setFatherItem] = useState('');
  const [fatherHp, setFatherHp] = useState(false);
  const [fatherAtk, setFatherAtk] = useState(false);
  const [fatherDef, setFatherDef] = useState(false);
  const [fatherSpa, setFatherSpa] = useState(false);
  const [fatherSpd, setFatherSpd] = useState(false);
  const [fatherSpe, setFatherSpe] = useState(false);

  const [childHp, setChildHp] = useState(false);
  const [childAtk, setChildAtk] = useState(false);
  const [childDef, setChildDef] = useState(false);
  const [childSpa, setChildSpa] = useState(false);
  const [childSpd, setChildSpd] = useState(false);
  const [childSpe, setChildSpe] = useState(false);

  const [ability, setAbility] = useState(5);

  const [result, setResult] = useState(undefined);

  return (
    <form id="app" onSubmit={(e) => {setResult(onSubmit(e))}}>
      <h1>
        Pokemon Breeding Odds Calculator
      </h1>

      <p>
        This calculator will provide the odds of getting a child with certain IVs based on the parents&#39; IVs, Items and Abilities.
      </p>

      <p>
        Note that the &quot;Mother&quot; in the table below refers to the non-Ditto parent where a male Pokemon is bred with a Ditto.
      </p>

      <table>
        <tr>
          <th scope="col">Parent:</th>
          <th scope="col">Item:</th>
          <th scope="col">HP:</th>
          <th scope="col">Atk:</th>
          <th scope="col">Def:</th>
          <th scope="col">SpA:</th>
          <th scope="col">SpD:</th>
          <th scope="col">Spe:</th>
        </tr>
        <Party name='Mother'
          isChild={false}
          item={motherItem}
          onChangeItem={(e) => setMotherItem(e.target.value)}
          hp={motherHp}
          onChangeHp={(e) => setMotherHp(e.target.checked)}
          atk={motherAtk}
          onChangeAtk={(e) => setMotherAtk(e.target.checked)}
          def={motherDef}
          onChangeDef={(e) => setMotherDef(e.target.checked)}
          spa={motherSpa}
          onChangeSpa={(e) => setMotherSpa(e.target.checked)}
          spd={motherSpd}
          onChangeSpd={(e) => setMotherSpd(e.target.checked)}
          spe={motherSpe}
          onChangeSpe={(e) => setMotherSpe(e.target.checked)} />
        <Party name='Father'
          isChild={false}
          item={fatherItem}
          onChangeItem={(e) => setFatherItem(e.target.value)}
          hp={fatherHp}
          onChangeHp={(e) => setFatherHp(e.target.checked)}
          atk={fatherAtk}
          onChangeAtk={(e) => setFatherAtk(e.target.checked)}
          def={fatherDef}
          onChangeDef={(e) => setFatherDef(e.target.checked)}
          spa={fatherSpa}
          onChangeSpa={(e) => setFatherSpa(e.target.checked)}
          spd={fatherSpd}
          onChangeSpd={(e) => setFatherSpd(e.target.checked)}
          spe={fatherSpe}
          onChangeSpe={(e) => setFatherSpe(e.target.checked)} />
        <Party name='Child'
          isChild={true}
          hp={childHp}
          onChangeHp={(e) => setChildHp(e.target.checked)}
          atk={childAtk}
          onChangeAtk={(e) => setChildAtk(e.target.checked)}
          def={childDef}
          onChangeDef={(e) => setChildDef(e.target.checked)}
          spa={childSpa}
          onChangeSpa={(e) => setChildSpa(e.target.checked)}
          spd={childSpd}
          onChangeSpd={(e) => setChildSpd(e.target.checked)}
          spe={childSpe}
          onChangeSpe={(e) => setChildSpe(e.target.checked)} />
      </table>

      <label>
        <p>
          Which Ability do you want the child to have?
        </p>
        <select name="ability" value={ability} onChange={(e)=>setAbility(e.target.value)}>
          <option value={5}>No preference</option>
          <option value={4}>Non-Hidden Ability, same as the Mother&#39;s</option>
          <option value={3}>Hidden Ability, same as the Mother&#39;s</option>
          <option value={1}>Non-Hidden Ability, not the same as the Mother&#39;s</option>
        </select>
      </label>
      <button type="submit">Calculate</button>
      {result === undefined ? '' : (
        <p>
          The odds of getting the target Pokemon with the given parents is <strong>{result['num'] * 100 / result['den']}%</strong>, or {result['num']} out of {result['den']}.
        </p>
      )}
    </form>
  );
}

export default App;

