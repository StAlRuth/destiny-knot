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
            <option value="5iv">Destiny Knot</option>
        </select>
      )}
    </td>
    <td>
      <input
        type="checkbox"
        name={props.name.toLowerCase() + '_hp'}
        checked={props.hp}
        onChange={props.onChangeHp} />
    </td>
    <td>
      <input type="checkbox"
        name={props.name.toLowerCase() + '_atk'}
        checked={props.atk}
        onChange={props.onChangeAtk} />
    </td>
    <td>
      <input type="checkbox"
        name={props.name.toLowerCase() + '_def'}
        checked={props.def}
        onChange={props.onChangeDef} />
    </td>
    <td>
      <input type="checkbox"
        name={props.name.toLowerCase() + '_spa'}
        checked={props.spa}
        onChange={props.onChangeSpa} />
    </td>
    <td>
      <input type="checkbox"
        name={props.name.toLowerCase() + '_spd'}
        checked={props.spd}
        onChange={props.onChangeSpd} />
    </td>
    <td>
      <input type="checkbox"
        name={props.name.toLowerCase() + '_spe'}
        checked={props.spe}
        onChange={props.onChangeSpe} />
    </td>
  </tr>
);

export default Party;

