import * as Collections from 'typescript-collections';
import {Solver} from '../solvers/Solver';
import {DataObjectClass} from './DataObjectClass';

describe('SetUse', () => {

  const date = new Date();
  const solverX: Solver = new Solver();
  solverX.oid = '55970eb7-da93-4611-b067-9ca6272401f1';
  solverX.updateTimestamp = date;
  solverX.name = 'solverX';

  const solverY: Solver = new Solver();
  solverY.oid = "8c1e59ba-a635-4ce3-b454-822742264f26";
  solverY.updateTimestamp = date;
  solverY.name = "solverY";

  const solverZ: Solver = new Solver();
  solverZ.oid = "36264259-a008-46e6-b649-e195508e1d82";
  solverZ.updateTimestamp = date;
  solverZ.name = "solverZ";

  const solverXupdated: Solver = new Solver();
  solverXupdated.oid = "55970eb7-da93-4611-b067-9ca6272401f1";
  solverXupdated.updateTimestamp = date;
  solverXupdated.name = "solverXUpdated";

  const solverYupdated: Solver = new Solver();
  solverYupdated.oid = "8c1e59ba-a635-4ce3-b454-822742264f26";
  solverYupdated.updateTimestamp = date;
  solverYupdated.name = "solverYUpdated";


  it('should add different solvers', () => {
    var mySet = new Collections.Set<DataObjectClass>();
    mySet.add(solverX);
    mySet.add(solverY);
    expect(mySet.size()).toBe(2);
  });


  it('should not add equal(by OID) solvers', () => {
    var mySet = new Collections.Set<DataObjectClass>();
    mySet.add(solverX);
    mySet.add(solverX);
    expect(mySet.size()).toBe(1);
  });

  it('should not add equal(by OID) solvers (differy only by OID)', () => {
    var mySet = new Collections.Set<DataObjectClass>();
    mySet.add(solverX);
    mySet.add(solverXupdated);
    expect(mySet.size()).toBe(1);
  });

  it('add solver, check if another instance of solver with same OID contains', () => {
    var mySet = new Collections.Set<DataObjectClass>();
    mySet.add(solverX);
    expect(mySet.contains(solverXupdated)).toBe(true);
  });

  it('add and remove same solver instance', () => {
    var mySet = new Collections.Set<DataObjectClass>();
    mySet.add(solverX);
    expect(mySet.size()).toBe(1);
    mySet.remove(solverX);
    expect(mySet.size()).toBe(0);
  });

  it('add and remove another solver instance with same oid', () => {
    var mySet = new Collections.Set<DataObjectClass>();
    mySet.add(solverX);
    expect(mySet.size()).toBe(1);
    mySet.remove(solverXupdated);
    expect(mySet.size()).toBe(0);
  });


  it('add and remove another solver instance with different oid', () => {
    var mySet = new Collections.Set<DataObjectClass>();
    mySet.add(solverX);
    expect(mySet.size()).toBe(1);
    mySet.remove(solverY);
    expect(mySet.size()).toBe(1);
  });

  it('difference method to work right', () => {
    var mySet = new Collections.Set<DataObjectClass>();
    mySet.add(solverX);
    mySet.add(solverY);
    expect(mySet.size()).toBe(2);

    var mySet2 = new Collections.Set<DataObjectClass>();
    mySet2.add(solverY);
    mySet2.add(solverZ);
    expect(mySet2.size()).toBe(2);

    mySet.difference(mySet2);
    expect(mySet.size()).toBe(1);
    expect(mySet2.size()).toBe(2);
    expect(mySet.contains(solverX)).toBe(true);
    expect(mySet.contains(solverY)).toBe(false);

    expect(mySet2.contains(solverY)).toBe(true);
    expect(mySet2.contains(solverZ)).toBe(true);

  });

  it('union method to work right', () => {
    var mySet = new Collections.Set<DataObjectClass>();
    mySet.add(solverX);
    mySet.add(solverY);
    expect(mySet.size()).toBe(2);

    var mySet2 = new Collections.Set<DataObjectClass>();
    mySet2.add(solverYupdated);
    mySet2.add(solverZ);
    expect(mySet2.size()).toBe(2);

    mySet.union(mySet2);
    expect(mySet.size()).toBe(3);
    expect(mySet2.size()).toBe(2);
    expect(mySet.contains(solverX)).toBe(true);
    expect(mySet.contains(solverY)).toBe(true);

    expect(mySet2.contains(solverYupdated)).toBe(true);
    expect(mySet2.contains(solverZ)).toBe(true);
  });


  it('difference and union together to work right', () => {
    //arrange
    var mySet = new Collections.Set<Solver>();
    mySet.add(solverX);
    mySet.add(solverY);
    expect(mySet.size()).toBe(2);

    var mySet2 = new Collections.Set<Solver>();
    mySet2.add(solverYupdated);
    mySet2.add(solverZ);
    expect(mySet2.size()).toBe(2);

    //act
    mySet.difference(mySet2);
    expect(mySet.size()).toBe(1);
    mySet.union(mySet2);

    //assert
    expect(mySet.size()).toBe(3);
    expect(mySet2.size()).toBe(2);
    expect(mySet.contains(solverX)).toBe(true);
    expect(mySet.contains(solverY)).toBe(true);
    expect(mySet.contains(solverZ)).toBe(true);

    var solverYInSet = mySet.toArray().find(item => item.name == solverYupdated.name);
    expect(solverYInSet).toBeDefined();

    expect(mySet2.contains(solverYupdated)).toBe(true);
    expect(mySet2.contains(solverZ)).toBe(true);
  });

});
