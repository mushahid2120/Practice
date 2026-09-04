
public class StringPractice{
    public static void main(String args[]){
        String s1="java";
        String s2="ja"+"va";
        String s3=new String(s1);
        String s4=new String(" ");
        // System.out.println(s4.isEmpty());
        // System.out.println(s4.isBlank());
        // System.out.println(s1.contains("jb"));
        // System.out.println(s2.lastIndexOf("a"));
        // System.out.println(s2.startsWith("v"));
        // String valueOf10=s2.valueOf(10);
        // System.out.print(valueOf10.getClass()==String.class);
        byte [] stringBinary=s3.getBytes();
        for(byte n:stringBinary){
            System.out.println();
        }
    }
}