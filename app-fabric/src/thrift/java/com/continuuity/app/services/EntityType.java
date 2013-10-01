/**
 * Autogenerated by Thrift Compiler (0.8.0)
 *
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
 *  @generated
 */
package com.continuuity.app.services;


import java.util.Map;
import java.util.HashMap;
import org.apache.thrift.TEnum;

/**
 * Specifies the type of resource being uploaded.
 */
public enum EntityType implements org.apache.thrift.TEnum {
  FLOW(0),
  PROCEDURE(1),
  MAPREDUCE(2),
  WORKFLOW(3),
  APP(4);

  private final int value;

  private EntityType(int value) {
    this.value = value;
  }

  /**
   * Get the integer value of this enum value, as defined in the Thrift IDL.
   */
  public int getValue() {
    return value;
  }

  /**
   * Find a the enum type by its integer value, as defined in the Thrift IDL.
   * @return null if the value is not found.
   */
  public static EntityType findByValue(int value) { 
    switch (value) {
      case 0:
        return FLOW;
      case 1:
        return PROCEDURE;
      case 2:
        return MAPREDUCE;
      case 3:
        return WORKFLOW;
      case 4:
        return APP;
      default:
        return null;
    }
  }
}
