import { h } from 'preact';

const Party = (props) => (
  <tr>
    <th scope="row">
      {props.name}
    </th>
    <td>
      {props.isChild ? ('') : (
        <select name={props.name.toLowerCase() + '_item'}
          value={props.item}
          onChange={props.onChangeItem}>
            <option value="">None/Other</option>
            <option value="hp">Power Weight</option>
            <option value="spd">Power Band</option>
            <option value="def">Power Belt</option>
            <option value="spa">Power Lens</option>
            <option value="atk">Power Bracer</option>
            <option value="spe">Power Anklet</option>
            <option value="5iv">Destiny Knot</option>
        </select>
      )}
    </td>
    <td>
      <label class='expander'>
        <input
          type="checkbox"
          name={props.name.toLowerCase() + '_hp'}
          checked={props.hp}
        onChange={props.onChangeHp} />
      </label>
    </td>
    <td>
      <label class='expander'>
        <input type="checkbox"
          name={props.name.toLowerCase() + '_atk'}
          checked={props.atk}
          onChange={props.onChangeAtk} />
      </label>
    </td>
    <td>
      <label class='expander'>
      <input type="checkbox"
        name={props.name.toLowerCase() + '_def'}
        checked={props.def}
        onChange={props.onChangeDef} />
      </label>
    </td>
    <td>
      <label class='expander'>
        <input type="checkbox"
          name={props.name.toLowerCase() + '_spa'}
          checked={props.spa}
          onChange={props.onChangeSpa} />
      </label>
    </td>
    <td>
      <label class='expander'>
        <input type="checkbox"
          name={props.name.toLowerCase() + '_spd'}
          checked={props.spd}
          onChange={props.onChangeSpd} />
      </label>
    </td>
    <td>
      <label class='expander'>
        <input type="checkbox"
          name={props.name.toLowerCase() + '_spe'}
          checked={props.spe}
          onChange={props.onChangeSpe} />
      </label>
    </td>
  </tr>
);

export default Party;

