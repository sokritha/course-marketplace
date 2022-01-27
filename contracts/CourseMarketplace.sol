// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CourseMarketplace {
    enum State {
        Purchased,
        Activated,
        Deactivated
    }

    struct Course {
        uint256 id; // 32 bytes -> 1 slot
        uint256 price; // 32 bytes -> 1 slot
        bytes32 proof; // 32 bytes -> 1 slot
        address owner; // 20 bytes ->
        State state; // 1 bytes    -> 1 slot // Order Matter
    }

    bool public isStopped = false;

    // mapping of courseHash to Course data
    mapping(bytes32 => Course) private ownedCourses;

    // mapping of totalownedcourse's id to courseHash
    mapping(uint256 => bytes32) private ownedCourseHash;

    // number of all purchasing course
    uint256 private totalOwnedCourses;

    // administrator
    address payable private owner;

    constructor() {
        setContractOwner(msg.sender);
    }

    /// Owner has already purchased this course!
    error CourseHasOwner();

    /// Sender is not course owner
    error SenderIsNotCourseOwner();

    /// Only owner has an access!
    error OnlyOwner();

    /// Course has invalid state!
    error InvalidState();

    /// Course is not created!
    error CourseIsNotCreated();

    modifier onlyOwner() {
        if (msg.sender != getContractOwner()) revert OnlyOwner();
        _;
    }

    modifier onlyWhenNotStopped() {
        require(!isStopped);
        _;
    }

    modifier onlyWhenStopped() {
        require(isStopped);
        _;
    }

    receive() external payable {}

    function withdraw(uint256 amount) external onlyOwner {
        (bool success, ) = owner.call{value: amount}("");
        require(success, "Transfer Failed");
    }

    function emergencyWithdraw() external onlyWhenStopped onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Transfer Failed");
    }

    // Destroy the contract and transfer all token to the owner
    function selfDestruct() external onlyWhenStopped onlyOwner {
        selfdestruct(owner);
    }

    function stopContract() external onlyOwner {
        isStopped = true;
    }

    function resumeContract() external onlyOwner {
        isStopped = false;
    }

    function purchaseCourse(bytes16 courseId, bytes32 proof)
        external
        payable
        onlyWhenNotStopped
    {
        // hash multiple value by combine together (hexof 32bits or 16bytes, 20 bytes)
        bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));

        if (hasCourseOwnership(courseHash)) {
            revert CourseHasOwner();
        }

        uint256 id = totalOwnedCourses++;
        ownedCourseHash[id] = courseHash;
        ownedCourses[courseHash] = Course({
            id: id,
            price: msg.value,
            proof: proof,
            owner: msg.sender,
            state: State.Purchased
        });
    }

    function repurchaseCourse(bytes32 courseHash)
        external
        payable
        onlyWhenNotStopped
    {
        if (!isCourseCreated(courseHash)) revert CourseIsNotCreated();
        if (!hasCourseOwnership(courseHash)) revert SenderIsNotCourseOwner();

        Course storage course = ownedCourses[courseHash];

        if (course.state != State.Deactivated) revert InvalidState();
        course.state = State.Purchased;
        course.price = msg.value;
    }

    function activateCourse(bytes32 courseHash)
        external
        onlyWhenNotStopped
        onlyOwner
    {
        if (!isCourseCreated(courseHash)) revert CourseIsNotCreated();
        Course storage course = ownedCourses[courseHash];

        if (course.state != State.Purchased) revert InvalidState();
        course.state = State.Activated;
    }

    function deactivateCourse(bytes32 courseHash)
        external
        onlyWhenNotStopped
        onlyOwner
    {
        if (!isCourseCreated(courseHash)) revert CourseIsNotCreated();
        Course storage course = ownedCourses[courseHash];

        if (course.state != State.Purchased) revert InvalidState();

        (bool success, ) = course.owner.call{value: course.price}("");
        require(success, "Transfer failed!");

        course.state = State.Deactivated;
        course.price = 0;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        setContractOwner(newOwner);
    }

    function getCourseCount() external view returns (uint256) {
        return totalOwnedCourses;
    }

    function getCourseHashAtIndex(uint256 index)
        external
        view
        returns (bytes32)
    {
        return ownedCourseHash[index];
    }

    function getCourseByHash(bytes32 courseHash)
        external
        view
        returns (Course memory)
    {
        return ownedCourses[courseHash];
    }

    function getContractOwner() public view returns (address) {
        return owner;
    }

    function setContractOwner(address newOwner) private {
        owner = payable(newOwner);
    }

    function isCourseCreated(bytes32 courseHash) private view returns (bool) {
        return
            ownedCourses[courseHash].owner !=
            0x0000000000000000000000000000000000000000;
    }

    function hasCourseOwnership(bytes32 courseHash)
        private
        view
        returns (bool)
    {
        return ownedCourses[courseHash].owner == msg.sender;
    }
}

// courseHash: relationship btw buyer and the course that they purchase
